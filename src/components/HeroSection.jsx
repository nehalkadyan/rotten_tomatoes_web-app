// Import necessary modules
import React from "react";
import SliderComp from "./Slider";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// HeroSection component
const HeroSection = () => {
  // Get slides from the Redux store
  const { slides } = useSelector((state) => state.article);

  // Get the first 4 slides for the slider
  const sliderSlides = slides.slice(0, 4);
  // Get the remaining slides for the article links
  const remainingSlides = slides.slice(4);

  return (
    <div className="md:flex gap-1 md:px-4">
      {/* Slider section */}
      <div className="md:w-1/2 mx-auto">
        <SliderComp slides={sliderSlides} />
      </div>
      {/* Article links section */}
      <div className="md:w-1/2 flex sm:gap-1 mt-6 md:mt-0">
        {remainingSlides.map((slide, idx) => (
          <Link
            to={`/article/${slide.id}`}
            key={idx}
            className="relative flex items-center flex-col justify-center"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="sm:h-full object-cover"
            />
            <div className="absolute p-3 border-l-red-700 border-l-4 text-center bottom-10 bg-black opacity-70">
              <h1 className="font-semibold text-xs md:text-lg opacity-100 text-white">
                {slide.title}
              </h1>
              <p className="text-white text-xs md:text-lg italic">
                {slide.caption}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Export component
export default HeroSection;
