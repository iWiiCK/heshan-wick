import portfolio from '../data/portfolio.json';

const sections = ['About', 'Work', 'Experience', 'Skills', 'Contact'];

export default function Navbar({ currentSection }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        data-glitch-target=""
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        {portfolio.meta.shortName}
      </div>
      <div className="navbar-links">
        {sections.map((s) => (
          <span
            key={s}
            data-glitch-target=""
            className={`navbar-link ${
              currentSection === s.toLowerCase() ? 'active' : ''
            }`}
            onClick={() => scrollToSection(s.toLowerCase())}
          >
            {s}
          </span>
        ))}
      </div>
    </nav>
  );
}
