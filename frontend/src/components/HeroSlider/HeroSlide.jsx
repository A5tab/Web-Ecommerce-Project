
function HeroSlide({ heroSlides, currentSlide }) {
    return (
        <div className="w-full h-full relative transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {heroSlides.map((slide, index) => (
                <img style={{left: `${index * 100}%`}} key={slide.title} src={slide.imgUrl} alt={slide.title} className="absolute object-cover w-full h-full" loading="lazy" />
            ))}
        </div>
    )
}

export default HeroSlide