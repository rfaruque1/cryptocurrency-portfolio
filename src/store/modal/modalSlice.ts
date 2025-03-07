import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isModalOpen: boolean;
}

export const initialState: ModalState = {
  isModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
