import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipeSlice";

// Load persisted state from local storage
const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
  },
  preloadedState: persistedState, // Initialize with the persisted state
});

store.subscribe(() => {
  const serializedState = JSON.stringify(store.getState());
  localStorage.setItem("reduxState", serializedState);
});

export default store;
