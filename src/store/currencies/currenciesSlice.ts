import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CURRENCIES_ITEMS_LOCAL_STORAGE_KEY } from "../../constants";

export interface Currencies {
  id: string;
  name: string;
}

export interface CurrenciesSliceInitialState {
  availableCurrencies: Currencies[];
}

export const initialState: CurrenciesSliceInitialState = {
  availableCurrencies: [],
};

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    loadCurrencies(state, { payload }: PayloadAction<Currencies[]>) {
      state.availableCurrencies = payload;

      localStorage.setItem(
        CURRENCIES_ITEMS_LOCAL_STORAGE_KEY,
        JSON.stringify(state.availableCurrencies)
      );
    },
  },
});

export const { loadCurrencies } = currenciesSlice.actions;

export default currenciesSlice.reducer;
