import React, { useState } from "react";
import Filters from "../components/Filters";
import { useDispatch, useSelector } from "react-redux";
import ContentCard from "../components/ContentCard";
import { selectFilters, resetShowFilters } from "../redux/content/contentSlice";

const Shows = () => {
  const dispatch = useDispatch();
  const { filteredShows } = useSelector((state) => state.content); // Get filtered shows from Redux state
  const [isDropdownEnabled, setDropdownEnabled] = useState(null); // State for dropdown enabled status
  const [isDropDownOpen, setIsDropDownOpen] = useState(false); // State for dropdown open/close
  const { showSort, showGenre } = useSelector((state) => state.content); // Get sort and genre filters from Redux state

  // Function to handle enabling/disabling dropdown
  const handleDropdownEnabled = (filter) => {
    setIsDropDownOpen(!isDropDownOpen); // Toggle dropdown open/close
    if (filter === "sort") {
      setDropdownEnabled("sort"); // Set dropdown enabled for sorting
    } else if (filter === "genre") {
      setDropdownEnabled("genre"); // Set dropdown enabled for genre filtering
    }
  };

  // Array of genre options for filtering
  const genreOptions = [
    "ACTION",
    "ADVENTURE",
    "ANIMATION",
    "COMEDY",
    "CRIME",
    "DRAMA",
    "THRILLER",
    "FANTASY",
    "MYSTERY",
  ];

  // Function to handle sorting by option selected
  const handleSorting = (sortOption) => {
    dispatch(selectFilters({ showSort: sortOption })); // Dispatch action to update show sorting
    setIsDropDownOpen(false); // Close dropdown after selection
  };

  // Function to handle search term input change
  const handleSearchTermChange = (e) => {
    dispatch(selectFilters({ showSearchInput: e.target.value })); // Dispatch action to update show search input
  };

  // Function to handle genre filtering by option selected
  const handleGenreFiltering = (genreOption) => {
    dispatch(selectFilters({ showGenre: genreOption })); // Dispatch action to update show genre filtering
    setIsDropDownOpen(false); // Close dropdown after selection
  };

  return (
    <div>
      <div className="p-8">
        <h1 className="font-semibold p-4 tracking-wide menu_items text-4xl">
          Shows
        </h1>
        <Filters
          isDropdownEnabled={isDropdownEnabled}
          isDropDownOpen={isDropDownOpen}
          handleDropdownEnabled={handleDropdownEnabled}
          handleSorting={handleSorting}
          handleGenreFiltering={handleGenreFiltering}
          handleSearchTermChange={handleSearchTermChange}
          searchPlaceholder={"shows"}
          sort={showSort}
          genre={showGenre}
          resetFilters={resetShowFilters}
          genreOptions={genreOptions}
        />

        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredShows.length === 0 ? (
              <div className="text-center mx-auto text-gray-600">
                No shows of the selected genre are available at the moment.
              </div>
            ) : (
              filteredShows.map((show, idx) => (
                <ContentCard
                  key={idx}
                  imgPath={show.poster_path}
                  rotten={show.popularity}
                  title={show.name}
                  release_date={show.first_air_date}
                  url={`/shows/${show.id}`}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shows;
