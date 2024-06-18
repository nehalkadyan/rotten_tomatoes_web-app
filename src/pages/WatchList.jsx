import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import ContentCard from "../components/ContentCard";
import { toggleModal } from "../redux/user/userSlice";

const WatchList = () => {
  const dispatch = useDispatch();
  const [movieList, setMovieList] = useState([]); // State for storing movie watchlist items
  const [showList, setShowList] = useState([]); // State for storing show watchlist items
  const [loading, setLoading] = useState(true); // State to manage loading state
  const { currentUser } = useSelector((state) => state.user); // Retrieve current user from Redux state

  useEffect(() => {
    const fetchWatchlist = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Fetch movie watchlist items
          const watchlistCollection = collection(
            db,
            "users",
            user.uid,
            "watchlist"
          );
          const watchlistSnapshot = await getDocs(watchlistCollection);
          const watchlistItems = watchlistSnapshot.docs.map((doc) =>
            doc.data()
          );
          setMovieList(watchlistItems);

          // Fetch show watchlist items
          const showlistCollection = collection(
            db,
            "users",
            user.uid,
            "showlist"
          );
          const showlistSnapshot = await getDocs(showlistCollection);
          const showlistItems = showlistSnapshot.docs.map((doc) => doc.data());
          setShowList(showlistItems);
        } catch (error) {
          console.error("Error fetching watchlist:", error.message);
        }
      }
      setLoading(false); // Set loading to false once data fetching is completed
    };

    fetchWatchlist();
  }, [currentUser]); // Fetch watchlist whenever currentUser changes

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
        <h2 className="text-3xl font-semibold ">My Watchlist</h2>
        {!currentUser && (
          <p className="p-4">
            Kindly sign in to view your personalised{" "}
            <span
              onClick={() => dispatch(toggleModal())}
              className="ml-2 text-blue-600 underline cursor-pointer"
            >
              Sign in
            </span>
          </p>
        )}

        {currentUser && (
          <>
            <h2 className="p-3 text-2xl font-semibold my-6">
              Watchlisted Movies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {movieList.length > 0 ? (
                movieList.map((item, index) => (
                  <ContentCard
                    key={index}
                    id={item.productId}
                    title={item.title}
                    rotten={item.rating}
                    imgPath={item.image}
                    url={`/movies/${item.productId}`}
                  />
                ))
              ) : (
                <p className="text-gray-600">Your movie watchlist is empty.</p>
              )}
            </div>
          </>
        )}

        {currentUser && (
          <>
            <h2 className="p-3 text-2xl font-semibold my-6">
              Watchlisted Shows
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {showList.length > 0 ? (
                showList.map((item, index) => (
                  <ContentCard
                    key={index}
                    id={item.productId}
                    title={item.title}
                    rotten={item.rating}
                    imgPath={item.image}
                    url={`/shows/${item.productId}`}
                  />
                ))
              ) : (
                <p className="text-gray-600">Your show watchlist is empty.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WatchList;
