import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const token = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  Authorization: "Bearer " + token,
};

// Throws on failure so callers (and useFetch) can show an error state.
export const fetchApi = async (url, params, { signal } = {}) => {
  const { data } = await axios.get(baseUrl + url, {
    headers,
    params,
    signal,
  });
  return data;
};
