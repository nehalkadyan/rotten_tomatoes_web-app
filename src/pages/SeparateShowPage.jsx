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
  const { showId } = useParams(); // Get the showId from the URL params
  const { shows } = useSelector((state) => state.content); // Get shows from Redux state
  const { currentUser } = useSelector((state) => state.user); // Get current user from Redux state
  const [actionValidation, setActionValidation] = useState(null); // State for action validation message

  const [isWatchListed, setIsWatchListed] = useState(false); // State to track if show is watchlisted
  const [loadingWatchList, setLoadingWatchList] = useState(false); // State to track loading state

  // Find the show with matching showId
  const show = shows.find((show) => show.id === parseInt(showId));

  // Calculate rating based on show's vote_average
  const rating = Math.round(show.vote_average / 2);

  // Effect to check if show is already in user's watchlist
  useEffect(() => {
    const fetchWatchlist = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, "users", user.uid, "showlist"),
          where("productId", "==", show.id)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setIsWatchListed(true);
        }
      }
    };

    fetchWatchlist();
  }, [show.id]); // Dependency on show.id to update when show changes

  // Function to handle adding/removing show from user's watchlist
  const handleAddToWatchlist = async () => {
    if (!currentUser) {
      setActionValidation("You must be logged in to perform this action");
      return;
    }

    const user = auth.currentUser;
    if (user) {
      setLoadingWatchList(true);
      try {
        const q = query(
          collection(db, "users", user.uid, "showlist"),
          where("productId", "==", show.id)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const watchlistedDocId = querySnapshot.docs[0].id;
          await deleteDoc(
            doc(db, "users", user.uid, "showlist", watchlistedDocId)
          );
          setIsWatchListed(false);
          console.log("Item removed from watchlist");
        } else {
          await addDoc(collection(db, "users", user.uid, "showlist"), {
            productId: show.id,
            title: show.name,
            rating: show.popularity,
            image: show.poster_path,
            addedAt: new Date(),
          });
          setIsWatchListed(true);
          console.log("Item added to watchlist");
        }
      } catch (error) {
        console.error("Error updating watchlist:", error.message);
      } finally {
        setLoadingWatchList(false);
        setActionValidation(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w1280${show.backdrop_path}`}
            alt={show.title}
            className="w-full h-64 object-cover object-center"
          />
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white rounded-full px-3 py-1 text-xs">
            {show.original_language.toUpperCase()}
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center">
            <img
              src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
              alt={show.title}
              className="w-48 h-auto rounded-lg shadow-lg mb-4 sm:mb-0 sm:mr-6"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-semibold mb-2">{show.name}</h2>
              <p className="text-gray-600 mb-2">{show.release_date}</p>
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
              <p className="text-gray-600 mb-4">{show.vote_count} votes</p>
              <p className="text-gray-800 leading-relaxed mb-4">
                {show.overview}
              </p>
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
