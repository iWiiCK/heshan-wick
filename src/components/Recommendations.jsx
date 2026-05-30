import { useState, useRef, useCallback, useEffect } from 'react';
import portfolio from '../data/portfolio.json';
import ScrollReveal from './ScrollReveal';
import LiquidCard from './LiquidCard';

export default function Recommendations() {
  const { recommendations } = portfolio;
  const items = recommendations.items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setTranslateX(diff);
  }, [isDragging, startX]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (translateX > 50) {
      handlePrev();
    } else if (translateX < -50) {
      handleNext();
    }
    setTranslateX(0);
  }, [isDragging, translateX, handlePrev, handleNext]);

  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setTranslateX(diff);
  }, [isDragging, startX]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (translateX > 50) {
      handlePrev();
    } else if (translateX < -50) {
      handleNext();
    }
    setTranslateX(0);
  }, [isDragging, translateX, handlePrev, handleNext]);

  const getItemStyle = (index) => {
    const diff = index - currentIndex;
    const normalizedDiff = ((diff + items.length) % items.length);
    const adjustedDiff = normalizedDiff > items.length / 2 ? normalizedDiff - items.length : normalizedDiff;
    
    const baseTranslate = adjustedDiff * 380;
    const dragOffset = isDragging ? translateX : 0;
    const scale = adjustedDiff === 0 ? 1 : 0.75;
    const opacity = Math.abs(adjustedDiff) > 1 ? 0 : (adjustedDiff === 0 ? 1 : 0.25);
    const zIndex = adjustedDiff === 0 ? 10 : 5 - Math.abs(adjustedDiff);

    return {
      transform: `translateX(calc(-50% + ${baseTranslate + dragOffset}px)) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <section className="section" id="recommendations">
      <ScrollReveal>
        <div className="section-header">
          <div className="section-number">[{recommendations.sectionNumber}]</div>
          <h2 className="section-title">{recommendations.title}</h2>
        </div>
      </ScrollReveal>
      
      <div className="recommendations-carousel">
        <button 
          className="recommendations-nav recommendations-nav-prev" 
          onClick={handlePrev}
          aria-label="Previous recommendation"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div 
          className="recommendations-track"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`recommendations-card-wrapper ${index === currentIndex ? 'active' : ''}`}
              style={getItemStyle(index)}
            >
              <LiquidCard className="recommendations-card">
                <div className="recommendations-card-header">
                  <div className="recommendations-name">{item.name}</div>
                  <div className="recommendations-meta">
                    <span className="recommendations-tag">{item.designation}</span>
                    <span className="recommendations-company">{item.company}</span>
                  </div>
                </div>
                <div className="recommendations-text">"{item.text}"</div>
              </LiquidCard>
            </div>
          ))}
        </div>

        <button 
          className="recommendations-nav recommendations-nav-next" 
          onClick={handleNext}
          aria-label="Next recommendation"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div className="recommendations-dots">
          {items.map((_, index) => (
            <button
              key={index}
              className={`recommendations-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to recommendation ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
