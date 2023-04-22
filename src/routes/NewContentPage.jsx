import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getMoviesInCarousel,
  getTvShowsInCarousel,
  clearCarouselsWithItems,
} from "../actions/discover.action";
import ContentCarousel from "../components/ContentCarousel";

const NewContentPage = () => {
  const dispatch = useDispatch();

  const pageCarousels = useSelector(
    (state) => state.discover.carouselsWithItems
  );

  const carousels = {
    newReleasedMovies: {
      name: "New Released Movies",
      itemType: "movie",
      key: "newReleasedMovies",
    },
    newReleasedTVShows: {
      name: "New Released TV Shows",
      itemType: "tv",
      key: "newReleasedTVShows",
    },
  };

  const requestOtions = {
    newReleasedMovies: {},
    newReleasedTVShows: {},
  };

  useEffect(() => {
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${
      (date.getMonth() + 1 - 3).toString().length === 1
        ? `0${date.getMonth() + 1 - 3}`
        : date.getMonth() + 1 - 3
    }-${date.getDate()}`;
    dispatch(
      getMoviesInCarousel(carousels.newReleasedMovies, {
        ...requestOtions.newReleasedMovies,
        // eslint-disable-next-line
        ["primary_release_date.gte"]: dateStr,
      })
    );
    dispatch(
      getTvShowsInCarousel(carousels.newReleasedTVShows, {
        ...requestOtions.newReleasedTVShows,
        // eslint-disable-next-line
        ["primary_release_date.gte"]: dateStr,
      })
    );
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

export default NewContentPage;
