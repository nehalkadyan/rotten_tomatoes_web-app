import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import { fetchMovies, fetchShows } from "../redux/content/contentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MovieCarousel from "../components/MovieCarousel";

const Homepage = () => {
  const dispatch = useDispatch();
  const { newMovies, popularMovies } = useSelector((state) => state.content);

  // Fetch movies and TV shows data on component mount
  useEffect(() => {
    const fetchContent = async () => {
      const movieUrl =
        "https://api.themoviedb.org/3/movie/top_rated?api_key=b11cf309b4861cd41806e2a4c0b43fcd";
      const tvUrl =
        "https://api.themoviedb.org/3/tv/top_rated?api_key=b11cf309b4861cd41806e2a4c0b43fcd";
      try {
        const [movieResponse, tvResponse] = await Promise.all([
          fetch(movieUrl),
          fetch(tvUrl),
        ]);
        const [movieResult, tvResult] = await Promise.all([
          movieResponse.json(),
          tvResponse.json(),
        ]);
        dispatch(fetchMovies(movieResult.results));
        dispatch(fetchShows(tvResult.results));
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, [dispatch]);

  return (
    <div className="w-full bg-gray-100">
      <HeroSection />

      <div className="lg:w-[88%] p-4 mx-auto bg-white">
        {/* New and upcoming movies section */}
        <div className="border-l-4 my-8 border-red-500">
          <h3 className="menu_items text-2xl font-semibold pl-4">
            NEW AND UPCOMING ON STREAMING
          </h3>
          <div className="text-sm italic underline tracking-wide font-semibold cursor-pointer text-blue-600 text-right px-3">
            <Link to="/movies">VIEW ALL</Link>
          </div>
        </div>
        <MovieCarousel movies={newMovies} />

        {/* Popular streaming movies section */}
        <div className="border-l-4 my-8 border-red-500">
          <h3 className="menu_items text-2xl font-semibold pl-4">
            POPULAR STREAMING MOVIES
          </h3>
          <div className="text-sm italic underline tracking-wide font-semibold cursor-pointer text-blue-600 text-right px-3">
            <Link to="/movies">VIEW ALL</Link>
          </div>
        </div>
        <MovieCarousel movies={popularMovies} />
      </div>
    </div>
  );
};

export default Homepage;
