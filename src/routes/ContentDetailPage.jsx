import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import NotFound from "./../components/NotFound";

import {
  getContentDetails,
  clearContentDetails,
} from "../actions/contentDetails.action";
import { TMDB_IMG_BASE_URL } from "../config";

const ContentDetailPage = () => {
  const params = useParams();
  const { contentType, id } = params;

  const dispatch = useDispatch();

  const itemDetails = useSelector((state) => state.contentDetails.item);
  const itemDetailsLoading = useSelector(
    (state) => state.contentDetails.loading
  );
  const itemDetailsError = useSelector((state) => state.contentDetails.error);

  useEffect(() => {
    dispatch(getContentDetails(contentType, id));
    return () => dispatch(clearContentDetails());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (itemDetailsLoading)
    return (
      <main className="page-content">
        <div className="text-center">
          <h4 className="my-5">Loading...</h4>
        </div>
      </main>
    );

  if ((contentType !== "movie" && contentType !== "tv") || itemDetailsError)
    return <NotFound />;

  console.log("harmeet test", itemDetails);

  return (
    <>
      {itemDetails !== null ? (
        <main className="page-content">
          <div className="container">
            <div className="row py-5">
              <div className="col-md-4">
                <div className="rounded overflow-hidden">
                  <img
                    className="w-100"
                    src={`${TMDB_IMG_BASE_URL}/t/p/original${itemDetails.poster_path}`}
                    alt={itemDetails.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/no-poster.jpg";
                    }}
                  />
                </div>
              </div>
              <div className="col-md-8 py-5">
                <h1>
                  {itemDetails.title
                    ? itemDetails.title
                    : itemDetails.original_name}{" "}
                  (
                  {itemDetails.release_date
                    ? itemDetails.release_date.substring(0, 4)
                    : itemDetails.first_air_date
                    ? itemDetails.first_air_date.substring(0, 4)
                    : ""}
                  )
                </h1>
                <h6>
                  Average Rating: {itemDetails.vote_average} | Total Votes:{" "}
                  {itemDetails.vote_count}
                </h6>

                <p className="text-muted">
                  <>
                    {itemDetails.genres.map((genre, i) => {
                      return (
                        <Fragment key={i}>
                          {i !== itemDetails.genres.length - 1
                            ? `${genre.name}, `
                            : `${genre.name}`}
                        </Fragment>
                      );
                    })}
                  </>{" "}
                  |{" "}
                  {itemDetails.runtime !== undefined
                    ? `${Math.floor(itemDetails.runtime / 60)}h ${
                        itemDetails.runtime % 60
                      }m`
                    : itemDetails.seasons !== undefined
                    ? `${itemDetails.seasons.length} season(s)`
                    : ""}
                </p>

                <h4 className="mt-5">Overview</h4>
                <p>{itemDetails.overview}</p>
              </div>
            </div>
          </div>
        </main>
      ) : (
        ""
      )}
    </>
  );
};

export default ContentDetailPage;
