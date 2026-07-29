import portfolio from '../data/portfolio.json';
import ScrollReveal from './ScrollReveal';
import LiquidCard from './LiquidCard';

export default function Education() {
  const { education } = portfolio;

  return (
    <section className="section" id="education">
      <ScrollReveal>
        <div className="section-header">
          <div className="section-number">[{education.sectionNumber}]</div>
          <h2 className="section-title">{education.title}</h2>
        </div>
      </ScrollReveal>
      <div className="education-list">
        {education.items.map((item, i) => (
          <ScrollReveal key={i} delay={1}>
            <div className="education-item" data-glitch-target="">
              <div>
                <h3 className="education-institution">{item.institution}</h3>
                <span className="education-period">{item.period}</span>
              </div>
              <LiquidCard className="education-details">
                <div className="education-degree">{item.degree}</div>
                <div className="education-result">{item.result}</div>
                <div className="education-location">{item.location}</div>
                {item.notes && (
                  <div className="education-notes">{item.notes}</div>
                )}
              </LiquidCard>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
