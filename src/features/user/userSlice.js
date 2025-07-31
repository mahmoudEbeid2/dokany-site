import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  cart: [],
  watchlist: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // ========== User ==========
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      state.cart = [];
      state.watchlist = [];
    },

    // ========== Cart ==========
    setIntialCart: (state, action) => {
      state.cart = action.payload;
    },

    // increase quantity of an item by 1 and optional take quantity (increase button in cart)
    addToCart: (state, action) => {
      const { product_id, quantity = 1, ...rest } = action.payload;

      if (!product_id || quantity <= 0) return;

      const exists = state.cart.find(item => item.product_id === product_id);

      if (exists) {
        exists.quantity += quantity;
      } else {
        state.cart.push({ product_id, ...rest, quantity });
      }
    },

    // decrease quantity of an item by 1 (decrease button in cart)
    removeFromCart: (state, action) => {
      const id = action.payload;

      const item = state.cart.find(item => item.id === id);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter(p => p.id !== id);
        }
      }
    },
    // delete all quantities of an item (delete button in cart)
    deleteFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter(item => item.id !== id);
    },


    clearCart: (state) => {
      state.cart = [];
    },

    // ========== Watchlist ==========
    setIntialWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    addToWatchlist: (state, action) => {
      const exists = state.watchlist.find(item => item.product_id === action.payload.product_id);
      if (!exists) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(item => item.id !== action.payload);
    },
    clearWatchlist: (state) => {
      state.watchlist = [];
    },
  },
});

export const {
  setUserInfo,
  clearUserInfo,
  setIntialCart,
  addToCart,
  removeFromCart,
  deleteFromCart,
  clearCart,
  setIntialWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  clearWatchlist,
} = userSlice.actions;

export default userSlice.reducer;

