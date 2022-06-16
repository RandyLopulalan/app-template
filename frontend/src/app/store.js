import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import putReducer from "../features/put/putSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    put: putReducer,
  },
});
