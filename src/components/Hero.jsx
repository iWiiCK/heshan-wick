import portfolio from '../data/portfolio.json';

export default function Hero() {
  const { hero } = portfolio;

  return (
    <section className="hero" id="hero">
      <span className="hero-greeting">{hero.greeting}</span>
      <h1 className="hero-name">
        <span className="hero-name-line">
          <span className="hero-name-text">{hero.firstName}</span>
        </span>
        {hero.lastName && (
          <span className="hero-name-line">
            <span className="hero-name-text">{hero.lastName}</span>
          </span>
        )}
      </h1>
      <div className="hero-line-accent" />
      <p className="hero-subtitle">{hero.subtitle}</p>
      <p className="hero-description">{hero.description}</p>
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-text">{hero.scrollCta}</span>
      </div>
    </section>
  );
}
