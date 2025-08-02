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
  },

});

export const {
  setSellerInfo,
} = sellerSlice.actions;

export default sellerSlice.reducer;