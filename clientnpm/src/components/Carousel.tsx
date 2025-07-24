import React, { useState } from 'react';
import '../carousel.css';

interface CarouselProps {
  slides: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  console.log('Carousel loaded', slides);

  const goToPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className="slider">
      <nav className="slider-nar left" onClick={goToPrev}>
        <img src="img/slider-nar-L.png" alt="Prev" />
      </nav>
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div className="carousel-item" key={idx}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      <nav className="slider-nar right" onClick={goToNext}>
        <img src="img/slider-nar-R.png" alt="Next" />
      </nav>
    </section>
  );
};

export default Carousel; 