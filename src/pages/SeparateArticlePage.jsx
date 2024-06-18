import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SeparateArticlePage = () => {
  const { id } = useParams(); // Extracts the id parameter from the URL

  const { slides } = useSelector((state) => state.article); // Retrieves slides from Redux state

  // Finds the slide with matching id
  const slide = slides.find((slide) => slide.id === parseInt(id));

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={slide.image} // Renders the image of the slide
          alt={slide.title} // Sets alt attribute for accessibility
          className="w-full h-full object-contain" // Styles for image
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{slide.title}</h1>{" "}
          {/* Renders the title */}
          <p className="text-gray-600 mb-4 italic">{slide.caption}</p>{" "}
          {/* Renders the caption */}
          <p className="text-gray-800 leading-relaxed">{slide.para}</p>{" "}
          {/* Renders the paragraph */}
        </div>
      </div>
    </div>
  );
};

export default SeparateArticlePage;
