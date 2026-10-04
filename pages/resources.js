import Layout from "@components/Layout";
const resources = [
  ["CyberQuest bot", "Get a random CyLab Security Academy challenge in Discord, filtered by difficulty or category.", "https://github.com/AashnaAnand25/cyberquest-bot"],
  ["picoCTF", "Practice cybersecurity through free, beginner-friendly challenges from Carnegie Mellon University.", "https://picoctf.org/"],
  ["CyLab Security Academy", "Explore challenge libraries, learning paths, videos, and CTF preparation material.", "https://learn.cylabacademy.org/"],
  ["WiCyS National", "Find conferences, scholarships, mentoring, and the wider Women in CyberSecurity community.", "https://www.wicys.org/"],
];
export default function Resources() { return <Layout title="Resources"><section className="page-hero shell"><p className="eyebrow">Keep learning</p><h1>Resources worth bookmarking.</h1><p>A starting point for practice, opportunities, and exploring cybersecurity outside our meetings.</p></section><section className="section shell resource-grid">{resources.map(([name, text, href]) => <a className="resource-card" href={href} target="_blank" rel="noreferrer" key={name}><span>↗</span><h2>{name}</h2><p>{text}</p></a>)}</section></Layout>; }
