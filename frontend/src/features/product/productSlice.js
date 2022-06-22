import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

// Get product from localStorage
// const dataProduct = JSON.parse(localStorage.getItem("dataProduct"));

const initialState = {
  product: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get product
export const getProduct = createAsyncThunk(
  "product/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getProduct();
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

// Create product
export const createProduct = createAsyncThunk(
  "product/create",
  async (dataProduct, thunkAPI) => {
    try {
      return await productService.createProduct(dataProduct);
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

// Delete product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id)
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
)

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = actions.payload;
      })
      .addCase(getProduct.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = state.product.push(actions.payload)
      })
      .addCase(createProduct.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = state.product.filter((list) => list._id !== actions.payload.id)
      })
      .addCase(deleteProduct.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      });
  },
});

export const { reset } = productSlice.actions;

export default productSlice.reducer;
