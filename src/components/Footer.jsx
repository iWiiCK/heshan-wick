import portfolio from '../data/portfolio.json';

export default function Footer() {
  const { footer } = portfolio;

  return (
    <footer className="footer" data-glitch-target="">
      <span className="footer-text">{footer.text}</span>
      <span className="footer-text">&copy; {footer.year}</span>
    </footer>
  );
}
