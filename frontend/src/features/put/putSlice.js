import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import putService from "./putService";

//Get user from localStorage
const dataProduct = JSON.parse(localStorage.getItem("dataProduct"));

const initialState = {
  dataProduct: dataProduct ? dataProduct : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Update product
export const update = createAsyncThunk(
  "put/update",
  async (dataProduct, thunkAPI) => {
    try {
      return await putService.update(dataProduct);
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

export const putSlice = createSlice({
  name: "put",
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
      .addCase(update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = actions.payload;
      })
      .addCase(update.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
        state.user = null;
      });
  },
});

export const { reset } = putSlice.actions;

export default putSlice.reducer;
