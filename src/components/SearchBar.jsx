import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ searchPlaceholder, handleSearchTermChange }) => {
  return (
    <div className="flex items-center px-1 sm:p-2 p-3 md:gap-4 gap-2 bg-red-500 border-2 rounded-full">
      {/* Search icon */}
      <div className="text-white md:text-xl ml-2">
        <IoSearch />
      </div>
      {/* Input field for search */}
      <input
        onChange={handleSearchTermChange}
        className="custom-placeholder text-sm sm:text-sm md:text-md lg:min-w-80 bg-red-500 text-white rounded-full border-0 outline-none"
        placeholder={`Search for ${searchPlaceholder}`}
      />
    </div>
  );
};

export default SearchBar;
