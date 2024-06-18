import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import SeparateMoviePage from "./components/SeparateMoviePage";
import SeparateShowPage from "./pages/SeparateShowPage";
import WatchList from "./pages/WatchList";
import SeparateArticlePage from "./pages/SeparateArticlePage";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Navigation bar component */}
      <Navbar />

      {/* Define routes for different pages */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/movies/:movieId" element={<SeparateMoviePage />} />
        <Route path="/shows/:showId" element={<SeparateShowPage />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/article/:id" element={<SeparateArticlePage />} />
      </Routes>

      {/* Footer component */}
      <Footer />
    </Router>
  );
}

export default App;
