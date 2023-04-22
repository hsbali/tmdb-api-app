import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";

import ContentDetailPage from "./routes/ContentDetailPage";
import HomePage from "./routes/HomePage";
import MoviesPage from "./routes/MoviesPage";
import NewContentPage from "./routes/NewContentPage";
import TVShowsPage from "./routes/TVShowsPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tv-shows" element={<TVShowsPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/new" element={<NewContentPage />} />
        <Route path="/:contentType/:id" element={<ContentDetailPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
