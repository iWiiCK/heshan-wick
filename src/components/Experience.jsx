import portfolio from '../data/portfolio.json';
import ScrollReveal from './ScrollReveal';
import LiquidCard from './LiquidCard';

export default function Experience() {
  const { experience, education } = portfolio;

  return (
    <>
      <section className="section" id="experience">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-number">[{experience.sectionNumber}]</div>
            <h2 className="section-title">{experience.title}</h2>
          </div>
        </ScrollReveal>
        <div className="experience-list">
          {experience.items.map((item, i) => (
            <ScrollReveal key={i} delay={1}>
              <div className="experience-item">
                <div className="experience-meta">
                  <h3 className="experience-company">{item.company}</h3>
                  <span className="experience-role">{item.role}</span>
                  <span className="experience-period">{item.period}</span>
                  {item.location && (
                    <span className="experience-location">{item.location}</span>
                  )}
                </div>
                <LiquidCard className="experience-body">
                  <p>{item.description}</p>
                  <div className="experience-tech">
                    {item.technologies.map((tech) => (
                      <span key={tech} className="experience-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </LiquidCard>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

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
              <div className="education-item">
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
    </>
  );
}
