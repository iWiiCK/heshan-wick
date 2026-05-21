import portfolio from '../data/portfolio.json';
import ScrollReveal from './ScrollReveal';
import LiquidCard from './LiquidCard';

export default function Achievements() {
  const { achievements } = portfolio;

  return (
    <section className="section" id="achievements">
      <ScrollReveal>
        <div className="section-header">
          <div className="section-number">[{achievements.sectionNumber}]</div>
          <h2 className="section-title">{achievements.title}</h2>
        </div>
      </ScrollReveal>
      <div className="achievements-grid">
        {achievements.items.map((item, i) => (
          <ScrollReveal key={i} delay={Math.min(i + 1, 5)}>
            <LiquidCard className="achievements-card">
              <div className="achievements-card-index">0{i + 1}</div>
              <div className="achievements-card-text">{item}</div>
            </LiquidCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
