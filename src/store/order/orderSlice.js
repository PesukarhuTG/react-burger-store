import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, POSTFIX } from "../../const";

const initialState = {
  orderList: JSON.parse(localStorage.getItem('ym-order') || '[]'),
  orderGoods: [],
  totalPrice: 0,
  totalCount: 0,
  error: [],
};

export const localStorageMiddleware = store => next => action => {
  const nextAction = next(action);

  if (nextAction.type.startsWith('order/')) {
    const orderList =  store.getState().order.orderList;
    localStorage.setItem('ym-order', JSON.stringify(orderList));
  }

  return nextAction;
};

export const orderRequestAsync = createAsyncThunk(
  'order/fetch', async (_, { getState }) => {

    const listId = await getState().order.orderList.map(item => item.id); //id list from LS
    const response = await fetch(`${API_URL}${POSTFIX}?list=${listId}`);
    const cartList = await response.json();
    return cartList;
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productOrderList = state.orderList.find(item => item.id === action.payload.id);

      if (productOrderList) {
        productOrderList.count += 1;

        const productOrderGood = state.orderGoods.find(item => item.id === action.payload.id);  //find full description
        productOrderGood.count = productOrderList.count; //actualization data
        state.totalCount = state.orderGoods.reduce((acc, item) => acc + item.count, 0);
        state.totalPrice = state.orderGoods.reduce((acc, item) => acc + item.count * item.price, 0);
      } else {
        state.orderList.push({...action.payload, count: 1}); //add only one product
      }
    },
    removeProduct: (state, action) => {
      const productOrderList = state.orderList.find(item => item.id === action.payload.id);

      if (productOrderList.count > 1) {
        productOrderList.count -= 1;

        const productOrderGood = state.orderGoods.find(item => item.id === action.payload.id);  //find full description
        productOrderGood.count = productOrderList.count; //actualization data
        state.totalCount = state.orderGoods.reduce((acc, item) => acc + item.count, 0);
        state.totalPrice = state.orderGoods.reduce((acc, item) => acc + item.count * item.price, 0);
      } else {
        state.orderList = state.orderList.filter(item => item.id !== action.payload.id);
      }
    },
    clearOrder: (state) => {
      state.orderList = [];
      state.orderGoods = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(orderRequestAsync.pending, (state) => {
        state.error = '';
      })
      .addCase(orderRequestAsync.fulfilled, (state, action) => {
        const orderGoods = state.orderList.map(item => {
          const product = action.payload.find(prod => prod.id === item.id); //prod - from server, item - from LS
          product.count = item.count;
          return product;
        })

        state.error = '';
        state.orderGoods = orderGoods;
        state.totalCount = orderGoods.reduce((acc, item) => acc + item.count, 0);
        state.totalPrice = orderGoods.reduce((acc, item) => acc + item.count * item.price, 0);
      })
      .addCase(orderRequestAsync.rejected, (state, action) => {
        state.error = action.error;
      })
  }
});

export const { addProduct, removeProduct, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;