import Layout from "@components/Layout";

const pastGames = [
  {
    year: "2023",
    title: "Operation Squirrel",
    description: "Explore campus, investigate digital clues, and solve a collection of security puzzles.",
    href: "https://wicys.github.io/eoh_2023/main_page.html"
  },
  {
    year: "2022",
    title: "Cybersecurity Escape Room",
    description: "Work through a browser-based mystery featuring passwords, databases, and social engineering clues.",
    href: "https://wicys.github.io/eoh_2022_final/eoh_2022_alt.html"
  },
  {
    year: "2021",
    title: "WiCyS EOH Game",
    description: "Try an earlier interactive cybersecurity challenge from the WiCyS Illinois archive.",
    href: "https://wicys.github.io/eoh_game.html"
  }
];

export default function Eoh() {
  return <Layout title="Engineering Open House">
    <section className="page-hero shell eoh-hero">
      <div>
        <p className="eyebrow">Engineering Open House</p>
        <h1>Security challenges built for campus.</h1>
        <p>Each year, WiCyS Illinois brings cybersecurity to Engineering Open House through interactive puzzles and games. Visitors can investigate clues, practice technical skills, and see how security connects to everyday technology.</p>
      </div>
      <div className="eoh-terminal" aria-hidden="true">
        <p><span>$</span> start eoh</p>
        <p className="eoh-output">loading puzzles...</p>
        <p className="eoh-output">cryptography ✓</p>
        <p className="eoh-output">osint ✓</p>
        <p className="eoh-output">command line ✓</p>
        <p><span>$</span> ready<span className="cursor">▌</span></p>
      </div>
    </section>

    <section className="section shell eoh-about">
      <div><p className="eyebrow">Learn by doing</p><h2>Part game, part introduction to cybersecurity.</h2></div>
      <p>Our EOH projects turn topics such as cryptography, open-source intelligence, command-line tools, and web security into approachable challenges. They are designed for visitors with different levels of technical experience.</p>
    </section>

    <section className="section eoh-archive">
      <div className="shell">
        <p className="eyebrow">From the archive</p>
        <h2>Play past EOH games</h2>
        <div className="eoh-grid">
          {pastGames.map((game) => <a className="eoh-card" href={game.href} target="_blank" rel="noreferrer" key={game.year}>
            <span>{game.year}</span><h3>{game.title}</h3><p>{game.description}</p><b>Launch game ↗</b>
          </a>)}
        </div>
        <p className="archive-note">These projects are preserved from the original WiCyS Illinois website. Some features may work best on a desktop browser.</p>
      </div>
    </section>
  </Layout>;
}
