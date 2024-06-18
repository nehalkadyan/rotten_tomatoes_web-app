// Import necessary modules
import React from "react";
import { Link } from "react-router-dom";
import { SiRottentomatoes } from "react-icons/si";

// ContentCard component
const ContentCard = ({ imgPath, rotten, title, url }) => {
  return (
    <Link to={url} className="max-w-52 shadow-sm">
      <img
        className="w-52 rounded-lg hover:opacity-90"
        src={`https://image.tmdb.org/t/p/w500/${imgPath}`}
        alt="movie"
      />
      <div className="p-2 mt-2 flex flex-col gap-3">
        <div className="flex gap-1 items-center">
          <div>
            <SiRottentomatoes className="text-2xl text-red-700" />
          </div>
          <p className="font-semibold">{rotten}%</p>
        </div>
        <h4 className="text-sm">{title}</h4>
      </div>
    </Link>
  );
};

// Export component
export default ContentCard;
