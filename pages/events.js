import Layout from "@components/Layout";
const events = [
  { title: "Technical workshops", image: "/technical.jpg", description: "Build practical skills through CTFs, security tools, command line sessions, reverse engineering, and guided challenges." },
  { title: "Industry + career", image: "/professional.jpg", description: "Meet cybersecurity professionals through talks, Q&As, recruiting events, resume sessions, and company partnerships." },
  { title: "Community events", image: "/social.jpg", description: "Get to know other members through study sessions, game nights, social events, and low-pressure ways to connect." },
];
export default function Events() {
  return <Layout title="Events">
    <section className="page-hero shell"><p className="eyebrow">What we do</p><h1>Learn, connect, and try something new.</h1><p>Our events are designed so you can participate whether you are opening a terminal for the first time or already compete in CTFs.</p></section>
    <section className="section shell calendar-section" aria-labelledby="upcoming-events-title">
      <div className="calendar-heading">
        <div><p className="eyebrow">WiCyS calendar</p><h2 id="upcoming-events-title">Upcoming events</h2></div>
      </div>
      <div className="calendar-embed-wrap">
        <iframe
          className="calendar-embed"
          src="https://calendar.google.com/calendar/embed?src=wicys.illinois%40gmail.com&ctz=America%2FChicago"
          title="WiCyS Illinois events calendar"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <p className="calendar-empty">Events are managed in the shared WiCyS calendar. <a className="text-link" href="https://calendar.google.com/calendar/u/0?cid=d2ljeXMuaWxsaW5vaXNAZ21haWwuY29t" target="_blank" rel="noreferrer">Open it in Google Calendar ↗</a></p>
    </section>
    <section className="section shell event-list">{events.map((event, index) => <article className="event-card" key={event.title}><img src={event.image} alt="" /><div><span>0{index + 1}</span><h2>{event.title}</h2><p>{event.description}</p></div></article>)}</section>
    <section className="section shell center"><h2>Want the next event?</h2><p>Dates and room details are posted on Discord and Instagram.</p><div className="actions centered"><a className="button" href="https://discord.gg/KQ2ewFv2NQ" target="_blank" rel="noreferrer">Open Discord</a><a className="text-link" href="https://www.instagram.com/wicys.illinois/" target="_blank" rel="noreferrer">View Instagram →</a></div></section>
  </Layout>;
}
