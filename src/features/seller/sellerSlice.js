import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sellerInfo: null,
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    // ========== Seller ==========
    setSellerInfo: (state, action) => {
      state.sellerInfo = action.payload;
    },
    updateTheme: (state, action) => {
      if (state.sellerInfo) {
        state.sellerInfo.theme = { name: action.payload };
      } else {
        state.sellerInfo = { theme: { name: action.payload } };
      }
    },
  },

});

export const {
  setSellerInfo,
  updateTheme,
} = sellerSlice.actions;

export default sellerSlice.reducer;