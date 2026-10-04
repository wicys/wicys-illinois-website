import Layout from "@components/Layout";
import { board } from "../data/board";

export default function Board() {
  return <Layout title="Board"><section className="page-hero shell"><p className="eyebrow">2026–2027</p><h1>Meet the board</h1><p>The students organizing our events, partnerships, projects, and community.</p></section><section className="section shell board-grid">{board.map((member) => <article className="person" key={member.name}><img src={member.image} alt={`${member.name}, ${member.role}`} /><div><p className="person-role">{member.role}</p><h2>{member.name}</h2><p>{member.study}</p></div></article>)}</section></Layout>;
}
