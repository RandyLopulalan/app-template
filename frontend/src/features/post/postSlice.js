import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

//Get user from localStorage
const dataProduct = JSON.parse(localStorage.getItem("dataProduct"));

const initialState = {
  dataProduct: dataProduct ? dataProduct : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register product
export const register = createAsyncThunk(
  "post/register",
  async (dataProduct, thunkAPI) => {
    try {
      return await postService.register(dataProduct);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = actions.payload;
      })
      .addCase(register.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
        state.user = null;
      });
  },
});

export const { reset } = postSlice.actions;

export default postSlice.reducer;
