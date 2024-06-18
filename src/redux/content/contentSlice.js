import { createSlice } from "@reduxjs/toolkit";

// Define initial state for the content slice
const initialState = {
  movies: [],
  shows: [],
  filteredMovies: [],
  filteredShows: [],
  newMovies: [],
  popularMovies: [],
  movieSearchTerm: "",
  showSearchTerm: "",
  sort: "SORT",
  genre: "GENRE",
  showSort: "SORT",
  showGenre: "GENRE",
};

// Create a content slice with reducers
const contentSlice = createSlice({
  // slice name
  name: "content",
  initialState,
  reducers: {
    // reducer to update movies and filteredMovies arrays
    fetchMovies: (state, action) => {
      state.movies = action.payload;
      state.filteredMovies = action.payload;

      // function to convert the string date into integer
      const dateToInteger = (date) => {
        // Split the date string by the hyphen
        const parts = date.split("-");
        // Combine the parts into an integer
        return parseInt(
          parts[0] * 10000 + parseInt(parts[1]) * 100 + parseInt(parts[2])
        );
      };

      // Create copies of the movies array before sorting
      state.newMovies = [...state.movies].sort(
        (a, b) => dateToInteger(b.release_date) - dateToInteger(a.release_date)
      );

      state.popularMovies = [...state.movies].sort(
        (a, b) => b.popularity - a.popularity
      );
    },
    // reducer to update shows and filteredShows arrays
    fetchShows: (state, action) => {
      state.shows = action.payload;
      state.filteredShows = action.payload;
    },

    selectFilters: (state, action) => {
      const {
        sort,
        genre,
        movieSearchInput,
        showSort,
        showGenre,
        showSearchInput,
      } = action.payload;

      // Update filter states
      if (sort) state.sort = sort;
      if (genre) state.genre = genre;
      if (movieSearchInput) {
        state.movieSearchTerm = movieSearchInput;
      }
      if (showSort) state.showSort = showSort;
      if (showGenre) state.showGenre = showGenre;
      if (showSearchInput) {
        state.showSearchTerm = showSearchInput;
      }

      // Start with the full list of movies
      let filteredMovies = [...state.movies];
      let filteredShows = [...state.shows];

      // Apply genre filter
      if (state.genre && state.genre !== "GENRE") {
        const genreMap = {
          ACTION: 28,
          ADVENTURE: 12,
          ANIMATION: 16,
          COMEDY: 35,
          CRIME: 80,
          DRAMA: 18,
          THRILLER: 53,
          FANTASY: 14,
        };
        const genreId = genreMap[state.genre.toUpperCase()];
        if (genreId) {
          filteredMovies = filteredMovies.filter((movie) =>
            movie.genre_ids.includes(genreId)
          );
        }
      }

      if (state.showGenre && state.showGenre !== "GENRE") {
        const genreMap = {
          ACTION: 28,
          ADVENTURE: 12,
          ANIMATION: 16,
          COMEDY: 35,
          CRIME: 80,
          DRAMA: 18,
          THRILLER: 53,
          FANTASY: 14,
          MYSTERY: 9648,
        };
        const genreId = genreMap[state.showGenre.toUpperCase()];
        if (genreId) {
          filteredShows = filteredShows.filter((show) =>
            show.genre_ids.includes(genreId)
          );
        }
      }

      // Apply search term filter
      if (state.movieSearchTerm && state.movieSearchTerm.trim() !== "") {
        filteredMovies = filteredMovies.filter((movie) =>
          movie.title
            .toLowerCase()
            .includes(state.movieSearchTerm.toLowerCase())
        );
      }

      if (state.showSearchTerm && state.showSearchTerm.trim() !== "") {
        filteredShows = filteredShows.filter((show) =>
          show.name.toLowerCase().includes(state.showSearchTerm.toLowerCase())
        );
      }

      // Apply sort filter
      if (state.sort !== "SORT") {
        if (state.sort === "A -> Z") {
          filteredMovies = filteredMovies.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
        } else if (state.sort === "MOST POPULAR") {
          filteredMovies = filteredMovies.sort(
            (a, b) => b.popularity - a.popularity
          );
        } else if (state.sort === "NEWEST") {
          filteredMovies = filteredMovies.sort(
            (a, b) => new Date(b.release_date) - new Date(a.release_date)
          );
        } else if (state.sort === "TOP BOX OFFICE") {
          filteredMovies = filteredMovies.sort(
            (a, b) => b.vote_count - a.vote_count
          );
        }
      }

      if (state.showSort !== "SORT") {
        if (state.showSort === "A -> Z") {
          filteredShows = filteredShows.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        } else if (state.showSort === "MOST POPULAR") {
          filteredShows = filteredShows.sort(
            (a, b) => b.popularity - a.popularity
          );
        } else if (state.showSort === "NEWEST") {
          filteredShows = filteredShows.sort(
            (a, b) => new Date(b.first_air_date) - new Date(a.first_air_date)
          );
        } else if (state.showSort === "TOP BOX OFFICE") {
          filteredShows = filteredShows.sort(
            (a, b) => b.vote_count - a.vote_count
          );
        }
      }

      // Update the filteredMovies state
      state.filteredMovies = filteredMovies;
      state.filteredShows = filteredShows;
    },

    resetFilters: (state) => {
      state.sort = "SORT";
      state.genre = "GENRE";
      state.filteredMovies = state.movies;
    },

    resetShowFilters: (state) => {
      state.showSort = "SORT";
      state.showGenre = "GENRE";
      state.filteredShows = state.shows;
    },
  },
});

// Export actions
export const {
  fetchMovies,
  fetchShows,
  selectFilters,
  resetFilters,
  resetShowFilters,
} = contentSlice.actions;
// Export Reducer
export default contentSlice.reducer;
