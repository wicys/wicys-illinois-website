const ICAL = require("ical.js");

const CALENDAR_FEED = "https://calendar.google.com/calendar/ical/wicys.illinois%40gmail.com/public/basic.ics";
const TIME_ZONE = "America/Chicago";
const MAX_OCCURRENCES_PER_SERIES = 5000;

function dateKey(time) {
  return `${time.year}-${String(time.month).padStart(2, "0")}-${String(time.day).padStart(2, "0")}`;
}

function statusIsCancelled(item) {
  return String(item.component.getFirstPropertyValue("status") || "").toUpperCase() === "CANCELLED";
}

function toCalendarEvent(item, startDate, endDate, recurrenceKey) {
  if (!item || statusIsCancelled(item)) return null;

  const start = startDate.isDate ? startDate : startDate.convertToZone(ICAL.TimezoneService.get(TIME_ZONE));
  const end = endDate.isDate ? endDate : endDate.convertToZone(ICAL.TimezoneService.get(TIME_ZONE));
  const allDay = Boolean(startDate.isDate);
  const startJs = startDate.toJSDate();
  const summary = item.summary || "WiCyS event";

  return {
    id: `${item.uid || summary}-${recurrenceKey || start.toString()}`,
    title: String(summary),
    location: String(item.location || ""),
    startDate: dateKey(start),
    endDate: dateKey(end),
    start: startJs.toISOString(),
    allDay,
    timeLabel: allDay
      ? "All day"
      : new Intl.DateTimeFormat("en-US", {
          timeZone: TIME_ZONE,
          hour: "numeric",
          minute: "2-digit",
        }).format(startJs),
  };
}

function registerTimeZones(calendar) {
  calendar.getAllSubcomponents("vtimezone").forEach((component) => {
    const timezone = new ICAL.Timezone({ component });
    ICAL.TimezoneService.register(timezone.tzid, timezone);
  });
}

function expandEvents(calendar, rangeStart, rangeEnd, rangeEndTime) {
  const components = calendar.getAllSubcomponents("vevent");
  const groups = new Map();

  components.forEach((component) => {
    const event = new ICAL.Event(component);
    const uid = event.uid || `event-${groups.size}`;
    if (!groups.has(uid)) groups.set(uid, { base: null, exceptions: [] });
    const group = groups.get(uid);
    if (event.isRecurrenceException()) group.exceptions.push(event);
    else group.base = event;
  });

  const output = [];
  const addIfInRange = (item, start, end, key) => {
    const day = dateKey(start.isDate ? start : start.convertToZone(ICAL.TimezoneService.get(TIME_ZONE)));
    if (day < rangeStart || day >= rangeEnd) return;
    const normalized = toCalendarEvent(item, start, end, key);
    if (normalized) output.push(normalized);
  };

  groups.forEach(({ base, exceptions }) => {
    if (!base) return;
    exceptions.forEach((exception) => base.relateException(exception));

    if (!base.isRecurring()) {
      addIfInRange(base, base.startDate, base.endDate);
      return;
    }

    const iterator = base.iterator();
    let occurrence;
    let count = 0;
    while ((occurrence = iterator.next()) && occurrence.compare(rangeEndTime) < 0 && count < MAX_OCCURRENCES_PER_SERIES) {
      count += 1;
      const details = base.getOccurrenceDetails(occurrence);
      const start = details.startDate;
      const end = details.endDate;
      const localStart = start.isDate ? start : start.convertToZone(ICAL.TimezoneService.get(TIME_ZONE));
      if (dateKey(localStart) >= rangeStart) {
        addIfInRange(details.item, start, end, occurrence.toString());
      }
    }
  });

  return output.sort((a, b) => a.start.localeCompare(b.start));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const year = Number(req.query.year);
  const month = Number(req.query.month);
  if (!Number.isInteger(year) || year < 2000 || year > 2100 || !Number.isInteger(month) || month < 1 || month > 12) {
    return res.status(400).json({ error: "Invalid calendar month" });
  }

  try {
    const response = await fetch(CALENDAR_FEED, { signal: AbortSignal.timeout(12000) });
    if (!response.ok) throw new Error(`Calendar feed returned ${response.status}`);
    const calendar = new ICAL.Component(ICAL.parse(await response.text()));
    registerTimeZones(calendar);

    const rangeStart = `${year}-${String(month).padStart(2, "0")}-01`;
    const nextMonth = new Date(Date.UTC(year, month, 1));
    const rangeEnd = `${nextMonth.getUTCFullYear()}-${String(nextMonth.getUTCMonth() + 1).padStart(2, "0")}-01`;

    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json({ events: expandEvents(calendar, rangeStart, rangeEnd, ICAL.Time.fromString(rangeEnd)) });
  } catch (error) {
    console.error("Unable to load the public WiCyS calendar", error);
    return res.status(502).json({ error: "The WiCyS calendar is temporarily unavailable" });
  }
}
