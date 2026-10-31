import { useEffect, useMemo, useState } from "react";
import Layout from "@components/Layout";
const events = [
  { title: "Technical workshops", image: "/technical.jpg", description: "Build practical skills through CTFs, security tools, command line sessions, reverse engineering, and guided challenges." },
  { title: "Industry + career", image: "/professional.jpg", description: "Meet cybersecurity professionals through talks, Q&As, recruiting events, resume sessions, and company partnerships." },
  { title: "Community events", image: "/social.jpg", description: "Get to know other members through study sessions, game nights, social events, and low-pressure ways to connect." },
];
export default function Events() {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [calendarStatus, setCalendarStatus] = useState("loading");
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const monthName = visibleMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const calendarCells = useMemo(() => {
    const cells = [
      ...Array.from({ length: firstWeekday }, (_, index) => ({ key: `blank-${index}`, day: null })),
      ...Array.from({ length: daysInMonth }, (_, index) => ({ key: `day-${index + 1}`, day: index + 1 })),
    ];
    while (cells.length % 7 !== 0) cells.push({ key: `trailing-${cells.length}`, day: null });
    return Array.from({ length: cells.length / 7 }, (_, index) => cells.slice(index * 7, index * 7 + 7));
  }, [daysInMonth, firstWeekday]);

  useEffect(() => {
    const controller = new AbortController();
    setCalendarStatus("loading");
    fetch(`/api/calendar?year=${year}&month=${month + 1}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Calendar request failed");
        return response.json();
      })
      .then(({ events: nextEvents }) => {
        setCalendarEvents(nextEvents);
        setCalendarStatus("ready");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setCalendarStatus("error");
      });
    return () => controller.abort();
  }, [month, year]);

  function changeMonth(offset) {
    setVisibleMonth(new Date(year, month + offset, 1));
  }

  return <Layout title="Events">
    <section className="page-hero shell"><p className="eyebrow">What we do</p><h1>Learn, connect, and try something new.</h1><p>Our events are designed so you can participate whether you are opening a terminal for the first time or already compete in CTFs.</p></section>
    <section className="section shell calendar-section" aria-labelledby="events-calendar-title">
      <div className="calendar-heading">
        <div><p className="eyebrow">WiCyS calendar</p><h2 id="events-calendar-title">Events calendar</h2></div>
        <div className="calendar-controls" aria-label="Calendar month navigation">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month">‹</button>
          <span aria-live="polite">{monthName}</span>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Next month">›</button>
        </div>
      </div>
      <table className="calendar-grid">
        <caption className="visually-hidden">{monthName} WiCyS events calendar</caption>
        <thead><tr>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((weekday) => <th className="calendar-weekday" scope="col" key={weekday}>{weekday}</th>)}</tr></thead>
        <tbody>{calendarCells.map((week, index) => <tr key={`week-${index}`}>{week.map(({ key, day }) => {
          const dayKey = day ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : "";
          const dayEvents = day ? calendarEvents.filter((event) => event.startDate === dayKey) : [];
          const isToday = day && isCurrentMonth && today.getDate() === day;
          return <td className={`calendar-day${isToday ? " is-today" : ""}`} aria-current={isToday ? "date" : undefined} key={key}>
            {day && <><time className="calendar-date" dateTime={dayKey}>{day}</time><div className="calendar-day-events">{dayEvents.map((event) => <details className="calendar-event" key={event.id}>
              <summary title={event.title}>{event.title}</summary>
              <div className="calendar-event-details"><time>{event.timeLabel}</time>{event.location && <p>{event.location}</p>}</div>
            </details>)}</div></>}
          </td>;
        })}</tr>)}</tbody>
      </table>
      {(calendarStatus === "loading" || calendarStatus === "error" || (calendarStatus === "ready" && calendarEvents.length === 0)) && <p className="calendar-empty" aria-live="polite">{calendarStatus === "loading" ? "Loading events…" : calendarStatus === "error" ? "The WiCyS calendar is temporarily unavailable. Please check back soon." : "No events are listed for this month."}</p>}
    </section>
    <section className="section shell event-list">{events.map((event, index) => <article className="event-card" key={event.title}><img src={event.image} alt="" /><div><span>0{index + 1}</span><h2>{event.title}</h2><p>{event.description}</p></div></article>)}</section>
    <section className="section shell center"><h2>Want the next event?</h2><p>Dates and room details are posted on Discord and Instagram.</p><div className="actions centered"><a className="button" href="https://discord.gg/KQ2ewFv2NQ" target="_blank" rel="noreferrer">Open Discord</a><a className="text-link" href="https://www.instagram.com/wicys.illinois/" target="_blank" rel="noreferrer">View Instagram →</a></div></section>
  </Layout>;
}
