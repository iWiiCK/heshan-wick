const sectionIds = ['hero', 'about', 'experience', 'achievements', 'education', 'skills', 'contact'];

export default function SectionIndicator({ currentSection }) {
  const scrollTo = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="section-indicator">
      {sectionIds.map((id) => (
        <div
          key={id}
          className={`section-dot ${currentSection === id ? 'active' : ''}`}
          onClick={() => scrollTo(id)}
          title={id}
        />
      ))}
    </div>
  );
}
