import Link from "next/link";

const links = [
  ["About", "/#about"], ["Events", "/events"], ["Board", "/board"],
  ["Resources", "/resources"], ["Partners", "/partners"],
];

export default function Header() {
  return <header className="site-header"><div className="shell nav-wrap">
    <Link className="brand" href="/" aria-label="WiCyS Illinois home"><img src="/wicys_logo.svg" alt="" /><span>WiCyS Illinois</span></Link>
    <nav aria-label="Main navigation">{links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}<a className="button button-small" href="https://discord.gg/KQ2ewFv2NQ" target="_blank" rel="noreferrer">Join us</a></nav>
  </div></header>;
}
