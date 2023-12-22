import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./homeSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});
