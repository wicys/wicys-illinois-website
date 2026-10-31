import { useState } from "react";
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
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const monthName = visibleMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const calendarCells = [
    ...Array.from({ length: firstWeekday }, (_, index) => ({ key: `blank-${index}`, day: null })),
    ...Array.from({ length: daysInMonth }, (_, index) => ({ key: `day-${index + 1}`, day: index + 1 })),
  ];
  while (calendarCells.length % 7 !== 0) {
    calendarCells.push({ key: `trailing-${calendarCells.length}`, day: null });
  }
  const calendarWeeks = Array.from({ length: calendarCells.length / 7 }, (_, index) => calendarCells.slice(index * 7, index * 7 + 7));

  function changeMonth(offset) {
    setVisibleMonth(new Date(year, month + offset, 1));
  }

  return <Layout title="Events">
    <section className="page-hero shell"><p className="eyebrow">What we do</p><h1>Learn, connect, and try something new.</h1><p>Our events are designed so you can participate whether you are opening a terminal for the first time or already compete in CTFs.</p></section>
    <section className="section shell calendar-section" aria-labelledby="upcoming-events-title">
      <div className="calendar-heading">
        <div><p className="eyebrow">WiCyS calendar</p><h2 id="upcoming-events-title">Upcoming events</h2></div>
        <div className="calendar-controls" aria-label="Calendar month navigation">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month">‹</button>
          <span aria-live="polite">{monthName}</span>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Next month">›</button>
        </div>
      </div>
      <table className="calendar-grid">
        <caption className="visually-hidden">{monthName} events calendar</caption>
        <thead><tr>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((weekday) => <th className="calendar-weekday" scope="col" key={weekday}>{weekday}</th>)}</tr></thead>
        <tbody>{calendarWeeks.map((week, index) => <tr key={`week-${index}`}>{week.map(({ key, day }) => <td className={`calendar-day${day && isCurrentMonth && today.getDate() === day ? " is-today" : ""}`} aria-current={day && isCurrentMonth && today.getDate() === day ? "date" : undefined} key={key}>{day && <time dateTime={`${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`}>{day}</time>}</td>)}</tr>)}</tbody>
      </table>
      <p className="calendar-empty">The latest event schedule is on the shared WiCyS Google Calendar. <a className="text-link" href="https://calendar.google.com/calendar/u/0?cid=d2ljeXMuaWxsaW5vaXNAZ21haWwuY29t" target="_blank" rel="noreferrer">Open the calendar ↗</a></p>
    </section>
    <section className="section shell event-list">{events.map((event, index) => <article className="event-card" key={event.title}><img src={event.image} alt="" /><div><span>0{index + 1}</span><h2>{event.title}</h2><p>{event.description}</p></div></article>)}</section>
    <section className="section shell center"><h2>Want the next event?</h2><p>Dates and room details are posted on Discord and Instagram.</p><div className="actions centered"><a className="button" href="https://discord.gg/KQ2ewFv2NQ" target="_blank" rel="noreferrer">Open Discord</a><a className="text-link" href="https://www.instagram.com/wicys.illinois/" target="_blank" rel="noreferrer">View Instagram →</a></div></section>
  </Layout>;
}
