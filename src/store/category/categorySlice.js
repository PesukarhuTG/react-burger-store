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
    const dataCategory = await response.json();
    return dataCategory;
})

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategory(state, action) {
      state.activeCategory = action.payload.indexCategory;
    },
  },
  extraReducers: {
    [categoryRequestAsync.pending.type]: (state) => {
      state.error = '';
    },
    [categoryRequestAsync.fulfilled.type]: (state, action) => {
      state.error = '';
      state.category = action.payload;
    },
    [categoryRequestAsync.rejected.type]: (state, action) => {
      state.error = action.payload;
    },
  }
});

export const { changeCategory } = categorySlice.actions;
export default categorySlice.reducer;