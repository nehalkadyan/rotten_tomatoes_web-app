import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const SliderComp = ({ slides }) => {
  const sliderRef = useRef(null); // Reference for the Slider component

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => {
      // Pauses autoplay before slide change
      if (sliderRef.current) {
        sliderRef.current.slickPause();
      }
    },
    afterChange: () => {
      // Resumes autoplay after slide change
      if (sliderRef.current) {
        sliderRef.current.slickPlay();
      }
    },
  };

  return (
    <section>
      <div className="relative">
        {/* Image slider */}
        <Slider {...settings} ref={sliderRef}>
          {slides.map((slide, index) => (
            <Link
              to={`/article/${slide.id}`}
              key={index}
              className="relative flex flex-col justify-center items-center"
            >
              <img
                className="w-full object-cover"
                src={slide.image}
                alt={`Slide ${index}`}
              />
              <div className="absolute mx-auto p-3 border-l-red-700 border-l-4 text-center bottom-10 bg-black opacity-70">
                <h1 className="font-semibold text-xs md:text-lg text-white">
                  {slide.title}
                </h1>
                <p className="text-white text-xs md:text-lg italic">
                  {slide.caption}
                </p>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default SliderComp;
