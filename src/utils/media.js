import dayjs from "dayjs";

// TMDB's image base URL is stable, so there is no need to call /configuration.
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const IMAGE_SIZES = {
  poster: "w342",
  posterLarge: "w500",
  backdrop: "w1280",
  profile: "w185",
  logo: "w92",
};

export const MEDIA_TYPES = ["movie", "tv"];

export const isValidMediaType = (type) => MEDIA_TYPES.includes(type);

export const imageUrl = (path, size, fallback) =>
  path ? IMAGE_BASE_URL + size + path : fallback;

// Movies have release_date, TV shows have first_air_date.
export const getReleaseDate = (item) =>
  item?.release_date || item?.first_air_date || "";

export const formatDate = (date, format = "MMM D, YYYY") =>
  date && dayjs(date).isValid() ? dayjs(date).format(format) : "";

export const getTitle = (item) => item?.title || item?.name || "";

// Two-letter country code for region-specific data such as watch providers,
// taken from the browser locale ("en-GB" -> "GB"), defaulting to the US.
export const getRegion = (locale = globalThis.navigator?.language) => {
  const region = locale?.split("-")[1]
  return region && /^[A-Za-z]{2}$/.test(region) ? region.toUpperCase() : "US"
}
