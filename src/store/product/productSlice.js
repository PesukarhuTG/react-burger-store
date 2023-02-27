import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, POSTFIX } from "../../const";

const initialState = {
  products: [],
  error: '',
};

export const productRequestAsync = createAsyncThunk(
  'prosuct/fetch', async (category) => {
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
      })
      .addCase(productRequestAsync.fulfilled, (state, action) => {
        state.error = '';
        state.products = action.payload;
      })
      .addCase(productRequestAsync.rejected, (state, action) => {
        state.error = action.payload.error;
      })
  }
});

export default productSlice.reducer;