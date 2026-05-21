import portfolio from '../data/portfolio.json';
import ScrollReveal from './ScrollReveal';
import LiquidCard from './LiquidCard';

export default function About() {
  const { about } = portfolio;

  return (
    <section className="section" id="about">
      <ScrollReveal>
        <div className="section-header">
          <div className="section-number">[{about.sectionNumber}]</div>
          <h2 className="section-title">{about.title}</h2>
        </div>
      </ScrollReveal>
      <div className="about-content">
        <div className="about-bio">
          {about.bio.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <p>{paragraph}</p>
            </ScrollReveal>
          ))}
        </div>
        <div className="about-highlights">
          {about.highlights.map((item, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <LiquidCard className="about-highlight-item">
                <div className="about-highlight-value">{item.value}</div>
                <div className="about-highlight-label">{item.label}</div>
              </LiquidCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
