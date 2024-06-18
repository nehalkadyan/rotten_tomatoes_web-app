import React, { useState } from "react";
import Filters from "../components/Filters";
import { useDispatch, useSelector } from "react-redux";
import ContentCard from "../components/ContentCard";
import { selectFilters } from "../redux/content/contentSlice";

const Movies = () => {
  const dispatch = useDispatch();
  const { filteredMovies, sort, genre } = useSelector((state) => state.content);
  const [isDropdownEnabled, setDropdownEnabled] = useState(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // Handle enabling dropdown and setting dropdown type
  const handleDropdownEnabled = (filter) => {
    setIsDropDownOpen(!isDropDownOpen);
    setDropdownEnabled(filter);
  };

  const genreOptions = [
    "ACTION",
    "ADVENTURE",
    "ANIMATION",
    "COMEDY",
    "CRIME",
    "DRAMA",
    "THRILLER",
    "FANTASY",
  ];

  // Handle search term change
  const handleSearchTermChange = (e) => {
    dispatch(selectFilters({ movieSearchInput: e.target.value }));
  };

  // Handle sorting option selection
  const handleSorting = (sortOption) => {
    dispatch(selectFilters({ sort: sortOption }));
    setIsDropDownOpen(false);
  };

  // Handle genre filtering option selection
  const handleGenreFiltering = (genreOption) => {
    dispatch(selectFilters({ genre: genreOption }));
    setIsDropDownOpen(false);
  };

  return (
    <div>
      <div className="p-8">
        <h1 className="font-semibold p-4 tracking-wide menu_items text-4xl">
          Movies
        </h1>
        {/* Filters component */}
        <Filters
          isDropdownEnabled={isDropdownEnabled}
          isDropDownOpen={isDropDownOpen}
          handleDropdownEnabled={handleDropdownEnabled}
          handleSorting={handleSorting}
          handleGenreFiltering={handleGenreFiltering}
          handleSearchTermChange={handleSearchTermChange}
          searchPlaceholder={"movies"}
          sort={sort}
          genre={genre}
          genreOptions={genreOptions}
        />

        {/* Displaying movies grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredMovies.length === 0 ? (
              <div className="text-center text-gray-600">
                No movies of the selected genre are available at the moment.
              </div>
            ) : (
              filteredMovies.map((movie, idx) => (
                <ContentCard
                  key={idx}
                  imgPath={movie.poster_path}
                  rotten={movie.popularity}
                  title={movie.title}
                  release_date={movie.release_date}
                  url={`/movies/${movie.id}`}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
