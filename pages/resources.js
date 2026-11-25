import Layout from "@components/Layout";
const resources = [
  ["CyberQuest bot", "Try CyLab Security Academy challenges with the CyberQuest bot in the WiCyS Discord.", "https://discord.gg/KQ2ewFv2NQ"],
  ["CyLab Security Academy", "Explore challenge libraries, learning paths, videos, and CTF preparation material.", "https://learn.cylabacademy.org/"],
  ["TryHackMe", "Learn cybersecurity through guided, hands-on rooms and learning paths.", "https://tryhackme.com/"],
  ["Hack The Box", "Practice penetration testing and cybersecurity skills in interactive labs.", "https://www.hackthebox.com/"],
  ["OverTheWire", "Build security skills through command-line wargames, starting with Bandit.", "https://overthewire.org/wargames/"],
  ["WiCyS National", "Find conferences, scholarships, mentoring, and the wider Women in CyberSecurity community.", "https://www.wicys.org/"],
];
export default function Resources() { return <Layout title="Resources"><section className="page-hero shell"><p className="eyebrow">Keep learning</p><h1>Resources worth bookmarking.</h1><p>A starting point for practice, opportunities, and exploring cybersecurity outside our meetings.</p></section><section className="section shell resource-grid">{resources.map(([name, text, href]) => <a className="resource-card" href={href} target="_blank" rel="noreferrer" key={name}><h2>{name}</h2><p>{text}</p></a>)}</section><section className="section shell center resource-suggestions"><h2>Know a resource we should add?</h2><p>Share practice sites, certification study tools, technical learning resources, or cybersecurity news with the WiCyS board.</p></section></Layout>; }
