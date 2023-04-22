import axios from "axios";

const request = async (method, url, body) => {
  let request;

  if (!axios.defaults.headers.common["Authorization"]) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      import.meta.env.VITE_TMDB_BEARER_TOKEN
    }`;
  }

  //   const endpoint = url.split("?")[0];
  //   const searchParams = new URLSearchParams(url.split("?")[1]);
  //   if (!searchParams.get("api_key")) {
  //     searchParams.append("api_key", import.meta.env.VITE_TMDB_API_KEY);
  //   }

  //   const newURL = endpoint + "?" + searchParams.toString();
  // const newURL = `https://cors-anywhere.herokuapp.com/${url}`;

  switch (method) {
    case "GET":
      request = await axios.get(url);
      break;
    case "POST":
      request = await axios.post(url, body);
      break;
    case "PUT":
      request = await axios.put(url, body);
      break;
    case "DELETE":
      request = await axios.delete(url, { data: body });
      break;

    default:
      break;
  }

  return request;
};

export default request;
