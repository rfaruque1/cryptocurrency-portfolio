import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "./portfolio/portfolioSlice";
import modalReducer from "./modal/modalSlice";
import currenciesReducer from "./currencies/currenciesSlice";

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    modal: modalReducer,
    currencies: currenciesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
