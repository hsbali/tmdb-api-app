import * as t from "../types";
import generateQueryParams from "../utils/generateQueryParams";
import request from "../utils/request";

import { TMDB_BASE_URL } from "../config";

const defaulQueryParams = {
  language: "en-US",
  sort_by: "popularity.desc",
  page: 1,
  include_adult: false,
  include_video: false,
};

export const getMoviesInCarousel =
  (carouselOptions, requestOptions) => async (dispatch) => {
    try {
      dispatch({
        type: t.GET_MOVIES_REQUEST,
      });
      if (!carouselOptions) {
        const err = { message: "Carousel option are not defined" };
        throw err;
      }

      const res = await request(
        "GET",
        `${TMDB_BASE_URL}/discover/movie${generateQueryParams({
          ...defaulQueryParams,
          ...requestOptions,
        })}`
      );

      const carouselData = {
        key: carouselOptions.key,
        name: carouselOptions.name,
        itemType: carouselOptions.itemType,
        items: res.data.results,
        page: res.data.page,
        totalPages: res.data.total_pages,
        requestOptions: {
          ...defaulQueryParams,
          ...requestOptions,
        },
      };

      dispatch({
        type: t.GET_MOVIES_SUCCESS,
        payload: { key: carouselOptions.key, data: carouselData },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: t.GET_MOVIES_FAIL,
      });
      if (err.response) return alert(err.message);
    }
  };

export const getTvShowsInCarousel =
  (carouselOptions, requestOptions) => async (dispatch) => {
    try {
      dispatch({
        type: t.GET_TV_SHOWS_REQUEST,
      });
      if (!carouselOptions) {
        const err = { message: "Carousel option are not defined" };
        throw err;
      }

      const res = await request(
        "GET",
        `${TMDB_BASE_URL}/discover/tv${generateQueryParams({
          ...defaulQueryParams,
          ...requestOptions,
        })}`
      );

      const carouselData = {
        key: carouselOptions.key,
        name: carouselOptions.name,
        itemType: carouselOptions.itemType,
        items: res.data.results,
        page: res.data.page,
        totalPages: res.data.total_pages,
        requestOptions: {
          ...defaulQueryParams,
          ...requestOptions,
        },
      };

      dispatch({
        type: t.GET_TV_SHOWS_SUCCESS,
        payload: { key: carouselOptions.key, data: carouselData },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: t.GET_TV_SHOWS_FAIL,
      });
      if (err.response) return alert(err.message);
    }
  };

export const onLoadMoreInCarousel = (carouselData) => async (dispatch) => {
  try {
    if (!carouselData) {
      alert("Cannot load more items");
      const err = { message: "Carousel option are not defined" };
      throw err;
    }

    if (carouselData.page <= 500) {
      const newRequestOptions = {
        ...carouselData.requestOptions,
        page: carouselData.page + 1,
      };
      const res = await request(
        "GET",
        `${TMDB_BASE_URL}/discover/${
          carouselData.itemType
        }${generateQueryParams(newRequestOptions)}`
      );

      const newCarouselData = {
        items: [...carouselData.items, ...res.data.results],
        page: res.data.page,
        totalPages: res.data.total_pages,
      };

      dispatch({
        type: t.ON_LOAD_MORE_ITEMS_SUCCESS,
        payload: { key: carouselData.key, data: newCarouselData },
      });
    }
  } catch (err) {
    console.log(err);
    alert("Cannot load more items");
    dispatch({
      type: t.ON_LOAD_MORE_ITEMS_SUCCESS,
    });
    // if (err.response) return alert(err.message)
  }
};

export const clearCarouselsWithItems = () => (dispatch) => {
  dispatch({
    type: t.CLEAR_CAROUSELS,
  });
};
