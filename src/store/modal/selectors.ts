import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const modalState = (state: RootState) => state.modal;

export const selectIsModalOpen = createSelector(
  modalState,
  (state) => state.isModalOpen
);
