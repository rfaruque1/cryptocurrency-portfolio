import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PORTFOLIO_ITEMS_LOCAL_STORAGE_KEY } from "../../constants";

export interface PortfolioItem {
  id: string;
  name: string;
  quantity: number;
  currentPrice: number;
  total: number;
}

export interface PortfolioState {
  portfolio: PortfolioItem[];
  editMode: boolean;
  currentTargetPortfolioItem?: PortfolioItem;
  portfolioItemToViewData?: PortfolioItem;
}

export const initialState: PortfolioState = {
  portfolio: [],
  editMode: false,
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    loadPortfolio(state, { payload }: PayloadAction<PortfolioItem[]>) {
      state.portfolio = payload;
    },
    addToPortfolio(state, { payload }: PayloadAction<PortfolioItem>) {
      state.portfolio.push(payload);

      localStorage.setItem(
        PORTFOLIO_ITEMS_LOCAL_STORAGE_KEY,
        JSON.stringify(state.portfolio)
      );
    },
    updatePortfolioItem(state, { payload }: PayloadAction<PortfolioItem>) {
      const { id } = payload;
      const currentTargetId = state.currentTargetPortfolioItem?.id;

      const locateId = id === currentTargetId ? id : currentTargetId;

      const retrievedItemIndex = state.portfolio.findIndex(
        (item) => item.id === locateId
      );

      if (retrievedItemIndex !== -1) {
        state.portfolio[retrievedItemIndex] = {
          ...state.portfolio[retrievedItemIndex],
          ...payload,
        };
      }
    },
    deletePortfolioItem(state, { payload: id }: PayloadAction<string>) {
      state.portfolio = state.portfolio.filter((item) => item.id !== id);

      localStorage.setItem(
        PORTFOLIO_ITEMS_LOCAL_STORAGE_KEY,
        JSON.stringify(state.portfolio)
      );
    },
    enterEditMode(state) {
      state.editMode = true;
    },
    exitEditMode(state) {
      state.editMode = false;
    },
    setCurrentTargetPortfolio(state, { payload: id }: PayloadAction<string>) {
      state.currentTargetPortfolioItem = state.portfolio.filter(
        (item) => item.id === id
      )[0];
    },
    clearCurrentTargetPortfolio(state) {
      state.currentTargetPortfolioItem = undefined;
    },
    setPortfolioItemToViewData(state, { payload: id }: PayloadAction<string>) {
      state.portfolioItemToViewData = state.portfolio.filter(
        (item) => item.id === id
      )[0];
    },
  },
});

export const {
  addToPortfolio,
  updatePortfolioItem,
  deletePortfolioItem,
  enterEditMode,
  exitEditMode,
  setCurrentTargetPortfolio,
  clearCurrentTargetPortfolio,
  loadPortfolio,
  setPortfolioItemToViewData,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
