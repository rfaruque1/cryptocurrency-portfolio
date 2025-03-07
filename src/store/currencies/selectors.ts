import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const currenciesState = (state: RootState) => state.currencies;

export const selectAvailableCurrencies = createSelector(
  currenciesState,
  (state) => state.availableCurrencies
);
