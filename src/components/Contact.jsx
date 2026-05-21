import portfolio from '../data/portfolio.json';
import ScrollReveal from './ScrollReveal';
import LiquidCard from './LiquidCard';

export default function Contact() {
  const { contact } = portfolio;

  return (
    <section className="section contact" id="contact">
      <ScrollReveal>
        <div className="section-header">
          <div className="section-number">[{contact.sectionNumber}]</div>
          <h2 className="section-title">{contact.title}</h2>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={1}>
        <p className="contact-description">{contact.description}</p>
      </ScrollReveal>
      <ScrollReveal delay={2}>
        <a href={`mailto:${contact.email}`} className="contact-email">
          {contact.email}
        </a>
      </ScrollReveal>
      <div className="contact-socials">
        {contact.socials.map((social, i) => (
          <ScrollReveal key={social.platform} delay={Math.min(i + 1, 5)}>
            <LiquidCard className="contact-social-link">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link-inner"
              >
                <div>
                  <div className="contact-social-platform">
                    {social.platform}
                  </div>
                  <div className="contact-social-handle">{social.handle}</div>
                </div>
                <span className="contact-social-arrow">&rarr;</span>
              </a>
            </LiquidCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
