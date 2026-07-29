import portfolio from '../data/portfolio.json';
import ScrollReveal from './ScrollReveal';
import LiquidCard from './LiquidCard';

export default function Experience() {
  const { experience } = portfolio;

  return (
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
            <div className="experience-item" data-glitch-target="">
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
  );
}
