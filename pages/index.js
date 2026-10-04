import Link from "next/link";
import Layout from "@components/Layout";

const offerings = [
  ["Learn", "Hands-on workshops, CTFs, technical talks, and beginner-friendly security practice."],
  ["Connect", "Meet peers, mentors, researchers, and professionals working across cybersecurity."],
  ["Grow", "Find leadership, career, conference, and project opportunities in an inclusive community."],
];

export default function Home() {
  return <Layout><section className="hero"><div className="shell hero-grid"><div><p className="eyebrow">Women in CyberSecurity · Illinois</p><h1>Find your place in cybersecurity.</h1><p className="hero-copy">A student community at UIUC for learning practical security skills, meeting people in the field, and growing together. Everyone is welcome, at every experience level.</p><div className="actions"><a className="button" href="https://discord.gg/KQ2ewFv2NQ" target="_blank" rel="noreferrer">Join the Discord</a><Link className="text-link" href="/events">See what we do →</Link></div></div><div className="terminal" aria-label="A short introduction to WiCyS Illinois"><div className="terminal-bar"><i></i><i></i><i></i><span>wicys@illinois</span></div><div className="terminal-body"><p><b>$</b> whoami</p><p className="output">curious · collaborative · cyber</p><p><b>$</b> cat next_event.txt</p><p className="output">Follow our Discord and Instagram for the latest meeting details.</p><span className="cursor">▌</span></div></div></div></section>
    <section id="about" className="section shell"><p className="eyebrow">About us</p><div className="split-heading"><h2>Security is better when more people help shape it.</h2><p>We are the UIUC student chapter of the national Women in CyberSecurity organization. We bring together students interested in security through technical workshops, career events, projects, conferences, and social events.</p></div><div className="card-grid three">{offerings.map(([title, text], index) => <article className="info-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="section section-accent"><div className="shell callout"><div><p className="eyebrow">Start here</p><h2>No cybersecurity experience required.</h2></div><div><p>Join the Discord for meeting announcements, opportunities, and conversations with members. Come to one event or keep showing up all semester—it is free and open to everyone.</p><a className="button button-light" href="https://discord.gg/KQ2ewFv2NQ" target="_blank" rel="noreferrer">Meet the community</a></div></div></section></Layout>;
}
