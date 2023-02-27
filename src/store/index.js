import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import productReducer from "./product/productSlice";
import orderReducer, { localStorageMiddleware } from "./order/orderSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
  },
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware().concat(localStorageMiddleware);
    return middlewares;
  }
});

export default store;