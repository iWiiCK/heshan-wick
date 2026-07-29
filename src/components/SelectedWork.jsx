import portfolio from '../data/portfolio.json';
import ScrollReveal from './ScrollReveal';
import LiquidCard from './LiquidCard';

export default function SelectedWork() {
  const { work } = portfolio;

  return (
    <section className="section" id="work">
      <ScrollReveal>
        <div className="section-header">
          <div className="section-number">[{work.sectionNumber}]</div>
          <h2 className="section-title">{work.title}</h2>
        </div>
      </ScrollReveal>
      <div className="work-list">
        {work.items.map((item, i) => (
          <ScrollReveal key={item.name} delay={Math.min(i + 1, 5)}>
            <LiquidCard className="work-card">
              <div className="work-card-header">
                <h3 className="work-card-name">{item.name}</h3>
                <span className="work-card-role">{item.role}</span>
              </div>
              <p className="work-card-summary">{item.summary}</p>
              <div className="work-card-outcome">{item.outcome}</div>
              <div className="work-card-tech">
                {item.technologies.map((tech) => (
                  <span key={tech} className="experience-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </LiquidCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
