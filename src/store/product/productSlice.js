import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, POSTFIX } from "../../const";

const initialState = {
  products: [],
  flag: false,
  error: '',
};

export const productRequestAsync = createAsyncThunk(
  'product/fetch', async (category) => {
    const response = await fetch(`${API_URL}${POSTFIX}?category=${category}`);
    const productList = await response.json();
    return productList;
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(productRequestAsync.pending, (state) => {
        state.error = '';
        state.flag = false;
      })
      .addCase(productRequestAsync.fulfilled, (state, action) => {
        state.error = '';
        state.products = action.payload;
        state.flag = true;
      })
      .addCase(productRequestAsync.rejected, (state, action) => {
        state.error = action.payload.error;
      })
  }
});

export default productSlice.reducer;