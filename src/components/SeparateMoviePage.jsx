import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toggleModal } from "../redux/user/userSlice";

const SeparateMoviePage = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams(); // Extracting movieId from URL params
  const { movies } = useSelector((state) => state.content); // Selecting movies state from Redux store
  const { currentUser } = useSelector((state) => state.user); // Selecting currentUser from Redux store
  const [actionValidation, setActionValidation] = useState(null); // State to manage action validation messages

  const [isWatchListed, setIsWatchListed] = useState(false); // State to track if movie is in user's watchlist
  const [loadingWatchList, setLoadingWatchList] = useState(false); // State to manage loading state for watchlist actions

  const movie = movies.find((movie) => movie.id === parseInt(movieId)); // Finding movie object by movieId

  const rating = Math.round(movie?.vote_average / 2); // Calculating rating out of 5

  useEffect(() => {
    // Effect to check if movie is in user's watchlist when component mounts
    const fetchWatchlist = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, "users", user.uid, "watchlist"),
          where("productId", "==", movie.id)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setIsWatchListed(true); // Set isWatchListed to true if movie is found in user's watchlist
        }
      }
    };

    fetchWatchlist();
  }, [movie.id]); // Dependency array to re-run effect when movie.id changes

  // Function to handle adding/removing movie from watchlist
  const handleAddToWatchlist = async () => {
    if (!currentUser) {
      // If user is not logged in, display action validation message
      setActionValidation("You must be logged in to perform this action");
      return;
    }

    const user = auth.currentUser;
    if (user) {
      setLoadingWatchList(true); // Set loading state to true during watchlist action
      try {
        const q = query(
          collection(db, "users", user.uid, "watchlist"),
          where("productId", "==", movie.id)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // If movie is already in watchlist, remove it
          const watchlistedDocId = querySnapshot.docs[0].id;
          await deleteDoc(
            doc(db, "users", user.uid, "watchlist", watchlistedDocId)
          );
          setIsWatchListed(false); // Update isWatchListed state
          console.log("Item removed from watchlist");
        } else {
          // If movie is not in watchlist, add it
          await addDoc(collection(db, "users", user.uid, "watchlist"), {
            productId: movie.id,
            title: movie.title,
            rating: movie.popularity,
            image: movie.poster_path,
            addedAt: new Date(),
          });
          setIsWatchListed(true); // Update isWatchListed state
          console.log("Item added to watchlist");
        }
      } catch (error) {
        console.error("Error updating watchlist:", error.message);
      } finally {
        setLoadingWatchList(false); // Set loading state to false after watchlist action completes
        setActionValidation(null); // Clear action validation message
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Movie backdrop image */}
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover object-center"
          />
          {/* Displaying movie language over backdrop image */}
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white rounded-full px-3 py-1 text-xs">
            {movie.original_language.toUpperCase()}
          </div>
        </div>
        {/* Movie details section */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center">
            {/* Movie poster */}
            <img
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
              className="w-48 h-auto rounded-lg shadow-lg mb-4 sm:mb-0 sm:mr-6"
            />
            <div className="flex-1">
              {/* Movie title */}
              <h2 className="text-3xl font-semibold mb-2">{movie.title}</h2>
              {/* Movie release date */}
              <p className="text-gray-600 mb-2">{movie.release_date}</p>
              {/* Movie rating */}
              <div className="flex items-center mb-2">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 ${
                        index < rating ? "fill-current" : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.143c.969 0 1.372 1.24.588 1.81l-3.36 2.436a1 1 0 00-.364 1.118l1.287 3.955c.3.92-.755 1.688-1.54 1.118l-3.36-2.436a1 1 0 00-1.175 0l-3.36 2.436c-.785.57-1.84-.197-1.54-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.637 9.382c-.784-.57-.381-1.81.588-1.81h4.143a1 1 0 00.95-.69l1.286-3.955z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-700">{rating} / 5</span>
              </div>
              {/* Movie vote count */}
              <p className="text-gray-600 mb-4">{movie.vote_count} votes</p>
              {/* Movie overview */}
              <p className="text-gray-800 leading-relaxed mb-4">
                {movie.overview}
              </p>
              {/* Button to add/remove from watchlist */}
              <button
                onClick={handleAddToWatchlist}
                disabled={loadingWatchList}
                className="flex w-2/5 border-2 font-bold border-gray-500 hover:border-black hover:opacity-90 cursor-pointer justify-center p-3 gap-2 items-center"
              >
                {loadingWatchList
                  ? "Loading..."
                  : isWatchListed && currentUser
                  ? "Watchlisted ✅"
                  : "Watchlist"}
              </button>
              {/* Display action validation message */}
              {actionValidation && !currentUser && (
                <p className="text-red-600 p-2 text-sm">
                  {actionValidation}
                  <span
                    onClick={() => dispatch(toggleModal())}
                    className="ml-2 text-blue-600 underline cursor-pointer"
                  >
                    Sign in
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeparateMoviePage;
