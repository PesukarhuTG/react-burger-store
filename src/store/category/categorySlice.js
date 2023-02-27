import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, POSTFIX } from "../../const";

const initialState = {
  category: [],
  error: '',
  activeCategory: 0,
};

export const categoryRequestAsync = createAsyncThunk(
  'category/fetch', async () => {
    const response = await fetch(`${API_URL}${POSTFIX}/category`);
    const categoryList = await response.json();
    return categoryList;
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategory(state, action) {
      state.activeCategory = action.payload.indexCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryRequestAsync.pending, (state) => {
        state.error = '';
      })
      .addCase(categoryRequestAsync.fulfilled, (state, action) => {
        state.error = '';
        state.category = action.payload;
      })
      .addCase(categoryRequestAsync.rejected, (state, action) => {
        state.error = action.payload.error;
      })
  }
});

export const { changeCategory } = categorySlice.actions;
export default categorySlice.reducer;