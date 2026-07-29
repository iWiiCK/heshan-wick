import portfolio from '../data/portfolio.json';
import ScrollReveal from './ScrollReveal';
import LiquidCard from './LiquidCard';

export default function Recognition() {
  const { recognition } = portfolio;

  return (
    <section className="section" id="recognition">
      <ScrollReveal>
        <div className="section-header">
          <div className="section-number">[{recognition.sectionNumber}]</div>
          <h2 className="section-title">{recognition.title}</h2>
        </div>
      </ScrollReveal>
      <div className="recognition-grid">
        {recognition.items.map((item, i) => (
          <ScrollReveal key={item.name} delay={Math.min(i + 1, 5)}>
            <LiquidCard className="recognition-card" data-glitch-target="">
              <div className="recognition-card-name">{item.name}</div>
              <div className="recognition-card-detail">{item.detail}</div>
            </LiquidCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
