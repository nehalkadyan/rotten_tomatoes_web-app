import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ContentCard from "./ContentCard";

// MovieCarousel component
const MovieCarousel = ({ movies }) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]} // Include the Navigation module for Swiper
        slidesPerView={5} // Default number of slides to show
        spaceBetween={30} // Space between slides in pixels
        navigation // Enable navigation buttons
        className="swiper-container"
        breakpoints={{
          // when window width is >= 1024px
          1024: {
            slidesPerView: 5, // Show 5 slides
          },
          // when window width is >= 640px and < 1024px
          640: {
            slidesPerView: 3, // Show 3 slides
          },
          // when window width is < 640px
          0: {
            slidesPerView: 2, // Show 2 slides
          },
        }}
      >
        {/* Map through the movies array to create SwiperSlide components */}
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className="image-container w-40 sm:w-52 rounded-lg overflow-hidden">
              <ContentCard
                imgPath={movie.poster_path} // Path to the movie poster image
                rotten={movie.popularity} // Popularity rating
                title={movie.title} // Movie title
                url={`/movies/${movie.id}`} // URL for the movie details page
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
