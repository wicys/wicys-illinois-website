import Link from "next/link";

const links = [
  ["About", "/#about"], ["Events", "/events"], ["Board", "/board"],
  ["EOH", "/eoh"], ["Resources", "/resources"], ["Partners", "/partners"],
];

export default function Header() {
  return <header className="site-header"><div className="shell nav-wrap">
    <Link className="brand" href="/" aria-label="WiCyS Illinois home"><img src="/wicys_logo.svg" alt="" /><span>WiCyS Illinois</span></Link>
    <nav aria-label="Main navigation">
      {links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
      <details className="join-menu">
        <summary className="button button-small">Join us <span aria-hidden="true">⌄</span></summary>
        <div className="join-menu-links">
          <a href="https://discord.gg/KQ2ewFv2NQ" target="_blank" rel="noreferrer"><span>Discord</span><b>Chat with the community ↗</b></a>
          <a href="https://www.instagram.com/wicys.illinois/" target="_blank" rel="noreferrer"><span>Instagram</span><b>See events and updates ↗</b></a>
          <a href="https://one.illinois.edu/WomenInCyberSecurityStudentChapter/club_signup" target="_blank" rel="noreferrer"><span>OneIllinois</span><b>Join the official organization ↗</b></a>
          <a href="https://linktr.ee/wicys_illinois" target="_blank" rel="noreferrer"><span>Linktree</span><b>Find all WiCyS links ↗</b></a>
        </div>
      </details>
    </nav>
  </div></header>;
}
