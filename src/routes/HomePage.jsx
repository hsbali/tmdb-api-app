import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getMoviesInCarousel,
  getTvShowsInCarousel,
  clearCarouselsWithItems,
} from "../actions/discover.action";
import ContentCarousel from "../components/ContentCarousel";

const Home = () => {
  const dispatch = useDispatch();

  const pageCarousels = useSelector(
    (state) => state.discover.carouselsWithItems
  );

  const carousels = {
    popularMovies: {
      name: "Popular Movies",
      itemType: "movie",
      key: "popularMovies",
    },
    popularTVShows: {
      name: "Popular TV Shows",
      itemType: "tv",
      key: "popularTVShows",
    },
  };

  useEffect(() => {
    dispatch(getMoviesInCarousel(carousels.popularMovies));
    dispatch(getTvShowsInCarousel(carousels.popularTVShows));
    return () => dispatch(clearCarouselsWithItems());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="page-content">
      {Object.keys(pageCarousels).map((carouselKey, i) => {
        return (
          <Fragment key={i}>
            <ContentCarousel carouselWithItems={pageCarousels[carouselKey]} />
          </Fragment>
        );
      })}
    </main>
  );
};

export default Home;
