import portfolio from '../data/portfolio.json';
import ScrollReveal from './ScrollReveal';
import LiquidCard from './LiquidCard';

export default function Skills() {
  const { skills } = portfolio;

  return (
    <section className="section" id="skills">
      <ScrollReveal>
        <div className="section-header">
          <div className="section-number">[{skills.sectionNumber}]</div>
          <h2 className="section-title">{skills.title}</h2>
        </div>
      </ScrollReveal>
      <div className="skills-grid">
        {skills.categories.map((category, i) => (
          <ScrollReveal key={category.name} delay={Math.min(i + 1, 5)}>
            <LiquidCard className="skills-category">
              <div className="skills-category-name">{category.name}</div>
              <div className="skills-items">
                {category.items.map((item) => (
                  <span key={item} className="skills-item">
                    {item}
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
