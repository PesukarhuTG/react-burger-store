import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import productReducer from "./product/productSlice";
import orderReducer, { localStorageMiddleware } from "./order/orderSlice";
import modalReducer from "./modalDelivery/modalDeliverySlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    modal: modalReducer,
  },
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware().concat(localStorageMiddleware);
    return middlewares;
  }
});

export default store;