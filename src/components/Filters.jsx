// Import necessary modules
import React from "react";
import { useDispatch } from "react-redux";
import SearchBar from "./SearchBar";

// Filters component
const Filters = ({
  searchPlaceholder,
  handleSearchTermChange,
  isDropdownEnabled,
  isDropDownOpen,
  handleDropdownEnabled,
  handleSorting,
  handleGenreFiltering,
  sort,
  genre,
  resetFilters,
  genreOptions,
}) => {
  // Initialize dispatch from react-redux
  const dispatch = useDispatch();
  const sortOptions = ["MOST POPULAR", "NEWEST", "A -> Z", "TOP BOX OFFICE"];

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
        <div className="relative text-center hover:border-gray-500 border-2 p-2 rounded-full">
          {/* Display current sort option */}
          <div
            className="font-semibold cursor-pointer md:min-w-40"
            onClick={() => handleDropdownEnabled("sort")}
          >
            {sort !== "SORT" ? <span>SORT : {sort}</span> : <span>{sort}</span>}
          </div>

          {/* Sort options dropdown menu */}
          {isDropdownEnabled === "sort" && isDropDownOpen && (
            <div className="absolute w-full top-full mt-1 border-t-2 left-0 sm:min-w-32 md:min-w-40 bg-white shadow-lg rounded-lg z-10">
              {sortOptions.map((option, idx) => (
                <div
                  onClick={() => handleSorting(option)}
                  key={idx}
                  className="w-full text-center hover:bg-gray-100 p-2 cursor-pointer"
                >
                  <h1 className="sm:text-sm text-xs font-semibold text-gray-700">
                    {option}
                  </h1>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative sm:min-w-40 text-center hover:border-gray-500 border-2 p-2 rounded-full">
          {/* Display current genre option */}
          <div
            className="font-semibold cursor-pointer md:min-w-40"
            onClick={() => handleDropdownEnabled("genre")}
          >
            {genre !== "GENRE" ? (
              <span>GENRE : {genre}</span>
            ) : (
              <span>{genre}</span>
            )}
          </div>

          {/* Genre options dropdown menu */}
          {isDropdownEnabled === "genre" && isDropDownOpen && (
            <div className="absolute mt-1 w-full top-full border-t-2 left-0 sm:min-w-32 md:min-w-40 bg-white shadow-lg rounded-lg z-10">
              {genreOptions.map((option, idx) => (
                <div
                  onClick={() => handleGenreFiltering(option)}
                  key={idx}
                  className="w-full text-center hover:bg-gray-100 p-2 cursor-pointer"
                >
                  <h1 className="text-sm font-semibold text-gray-700">
                    {option}
                  </h1>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Search bar component */}
        <SearchBar
          handleSearchTermChange={handleSearchTermChange}
          searchPlaceholder={searchPlaceholder}
        />
      </div>

      {/* Reset filters button */}
      <button
        onClick={() => dispatch(resetFilters())}
        className="text-blue-600 p-3 cursor-pointer"
      >
        Reset Filters
      </button>
    </div>
  );
};

// Export component
export default Filters;
