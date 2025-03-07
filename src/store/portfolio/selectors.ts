import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const portfolioState = (state: RootState) => state.portfolio;

export const selectPortfolioItems = createSelector(
  portfolioState,
  (state) => state.portfolio
);

export const selectIsEditMode = createSelector(
  portfolioState,
  (state) => state.editMode
);

export const selectCurrentTargetPortfolioItem = createSelector(
  portfolioState,
  (state) => state.currentTargetPortfolioItem
);

export const selectPortfolioItemToViewData = createSelector(
  portfolioState,
  (state) => state.portfolioItemToViewData
);
