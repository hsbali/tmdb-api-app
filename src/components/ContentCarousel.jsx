import { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { onLoadMoreInCarousel } from "../actions/discover.action";
import { TMDB_IMG_BASE_URL } from "../config";

const ContentCarousel = ({ carouselWithItems }) => {
  const dispatch = useDispatch();
  const [startOverflow, setStartOverflow] = useState(false);
  const [endOverflow, setEndOverflow] = useState(true);

  const scrollRef = useRef(); // useHorizontalScroll(setStartOverflow, setEndOverflow)

  const onScrollCarousel = () => {
    const el = scrollRef.current;
    if (el.scrollLeft === el.scrollWidth - el.clientWidth) {
      setEndOverflow(false);
      dispatch(onLoadMoreInCarousel(carouselWithItems));
    } else {
      setEndOverflow(true);
    }

    if (el.scrollLeft !== 0) {
      setStartOverflow(true);
    } else {
      setStartOverflow(false);
    }
  };

  return (
    <div className={`carousel-container mb-3`}>
      <h3 className="mt-5 mb-4">{carouselWithItems.name}</h3>
      <div className={`carousel`}>
        <div
          className={
            startOverflow ? `start-overflow visible` : `start-overflow`
          }
        ></div>
        {carouselWithItems && carouselWithItems.items ? (
          <>
            <ul
              ref={scrollRef}
              className={`carousel-scroll d-flex gap-2`}
              onScroll={(e) => onScrollCarousel(e)}
            >
              {carouselWithItems.items.map((item, i) => {
                return (
                  <Fragment key={i}>
                    <li className={`content-item`}>
                      <Link
                        to={{
                          pathname: `/${carouselWithItems.itemType}/${item.id}`,
                          pageProps: {
                            type: carouselWithItems.itemType,
                          },
                        }}
                      >
                        <div className={`poster-container`}>
                          <img
                            className="w-100"
                            src={`${TMDB_IMG_BASE_URL}/t/p/original${item.poster_path}`}
                            alt={item.title}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/no-poster.jpg";
                            }}
                          />
                        </div>
                        <div className="p-2">
                          {carouselWithItems.itemType === "movie" ? (
                            <h6 className="mb-2">{item.title}</h6>
                          ) : (
                            <h6 className="mb-2">{item.original_name}</h6>
                          )}
                          <p className="mb-1">Rating: {item.vote_average}</p>
                        </div>
                      </Link>
                    </li>
                  </Fragment>
                );
              })}
            </ul>
          </>
        ) : (
          ""
        )}
        <div
          className={endOverflow ? `end-overflow visible` : `end-overflow`}
        ></div>
      </div>
    </div>
  );
};

export default ContentCarousel;
