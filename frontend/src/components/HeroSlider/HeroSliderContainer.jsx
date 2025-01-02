import React, { useState, useEffect } from 'react'
import HeroSlide from './HeroSlide'

function HeroSliderContainer() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    { imgUrl: "https://images.priceoye.pk/banners/pakistan-priceoye-slider-rsyab.jpg", title: "Slide 1" },
    { imgUrl: "https://picsum.photos/id/239/1920/1080", title: "Slide 2" },
    { imgUrl: "https://picsum.photos/id/240/1920/1080", title: "Slide 3" },
    { imgUrl: "https://picsum.photos/id/242/1920/1080", title: "Slide 4" },
    { imgUrl: "https://picsum.photos/id/241/1920/1080", title: "Slide 5" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === heroSlides.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); // Change slide every 3 seconds

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []);
  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? heroSlides.length - 1 : prevSlide - 1));
  }
  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === heroSlides.length - 1 ? 0 : prevSlide + 1));
  }
  return (
    <div className='relative overflow-hidden max-w-full mx-4 my-2 h-96'>
      <HeroSlide heroSlides={heroSlides} currentSlide={currentSlide}></HeroSlide>

      {/* <button onClick={handlePrev} className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white'>
        <img src="https://img.icons8.com/ios-glyphs/30/ffffff/chevron-left.png" alt="Previous" />
      </button>

      <button onClick={handleNext} className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white'>
        <img src="https://img.icons8.com/ios-glyphs/30/ffffff/chevron-right.png" alt="Next" />
      </button> */}

      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex'>
        {heroSlides.map((_, index) => (
          <div key={index} className={`rounded-full w-3 h-3 mx-1 ${index === currentSlide ? 'bg-blue-500' : 'bg-white'}`}></div>
        ))}
      </div>
    </div>
  )
}

export default HeroSliderContainer