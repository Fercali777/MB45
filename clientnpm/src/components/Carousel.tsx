import React, { useState, useEffect } from 'react';
import '../carousel.css';

interface CarouselProps {
  slides: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  console.log('Carousel loaded with', slides.length, 'slides');

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) {
    return <div>No slides available</div>;
  }

  return (
    <section className="slider">
      <nav className="slider-nar left" onClick={goToPrev}>
        <img src="/img/slider-nar-L.png" alt="Previous" />
      </nav>
      
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${current * 33.333}%)` }}
        >
          {slides.map((slide, idx) => (
            <div className="carousel-item" key={idx}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      
      <nav className="slider-nar right" onClick={goToNext}>
        <img src="/img/slider-nar-R.png" alt="Next" />
      </nav>
      
      {/* Carousel indicators */}
      <div className="carousel-indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`indicator ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel; 