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
        <h1>Cybersecurity you can see, build, and try.</h1>
        <p>WiCyS Illinois brings hands-on cybersecurity projects to Engineering Open House. Past exhibits have included interactive games, and in 2026 members built a working, hardware-based Enigma machine.</p>
      </div>
      <div className="eoh-terminal" aria-hidden="true">
        <p><span>$</span> encode "HELLO"</p>
        <p className="eoh-output">input keys → rotor</p>
        <p className="eoh-output">rotor → reflector</p>
        <p className="eoh-output">reflector → output LEDs</p>
        <p><span>$</span> cipher ready<span className="cursor">▌</span></p>
      </div>
    </section>

    <section className="section shell eoh-about">
      <div><p className="eyebrow">Learn by doing</p><h2>Different years, different ways to explore security.</h2></div>
      <p>EOH projects make ideas like cryptography, privacy, and digital investigation approachable for visitors. Some years, that means solving a game; other years, it means experimenting with a physical system and seeing how it works.</p>
    </section>

    <section className="section eoh-2026">
      <div className="shell">
        <p className="eyebrow">2026 EOH exhibit · hardware, not a game</p>
        <h2>A mini Enigma machine, built by WiCyS.</h2>
        <div className="eoh-project-layout">
          <div className="eoh-project-copy">
            <p>WiCyS members designed and built a working mini Enigma machine to show how symmetric encryption can be brought to life with physical hardware.</p>
            <p>Laser-cut rotors and a reflector were hand-soldered with wire paths based on a custom letter-mapping matrix. A breadboard connected the letter buttons and LED indicators to the machine, with a battery supplying power.</p>
            <p>Pressing a letter sent current through the rotor, into the reflector, and back through the rotor to light the encrypted letter. Visitors could then press that letter to follow the path in reverse and reveal the original. Shifting a rotor changed the mapping across the alphabet.</p>
          </div>
          <figure className="eoh-feature-photo">
            <img src="/eoh-2026/eoh-2026-machine.jpg" alt="The WiCyS 2026 Enigma exhibit, showing its wooden rotors, breadboard, buttons, and LED circuits." />
            <figcaption>The completed machine combined laser-cut rotors with a wired input and LED display.</figcaption>
          </figure>
        </div>

        <div className="eoh-flow" aria-label="How the Enigma exhibit worked">
          <div><span>01</span><h3>Press a letter</h3><p>A visitor selects a letter using the physical input buttons.</p></div>
          <div><span>02</span><h3>Follow the circuit</h3><p>Current travels through the rotor and reflector mappings.</p></div>
          <div><span>03</span><h3>Read the output</h3><p>An LED lights up the encrypted letter; a shifted rotor changes the result.</p></div>
        </div>

        <div className="eoh-gallery" aria-label="Photos from the 2026 Enigma machine project">
          <figure>
            <img src="/eoh-2026/eoh-2026-build.jpg" alt="WiCyS members assembling the Enigma machine's breadboard and electronic components." />
            <figcaption>Building and wiring the machine together.</figcaption>
          </figure>
          <figure>
            <img src="/eoh-2026/eoh-2026-wiring.jpg" alt="A close view of members connecting the wooden rotor assembly to the breadboard circuit." />
            <figcaption>Connecting the physical rotors to the circuit.</figcaption>
          </figure>
          <figure>
            <img src="/eoh-2026/eoh-2026-exhibit.jpg" alt="WiCyS members presenting their Enigma machine exhibit at Engineering Open House." />
            <figcaption>Sharing the finished exhibit at Engineering Open House.</figcaption>
          </figure>
        </div>
      </div>
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
