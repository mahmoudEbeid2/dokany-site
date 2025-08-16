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
    updateUserTheme: (state, action) => {
      if (state.userInfo) {
        state.userInfo.theme = action.payload;
      }
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
      const { product_id, quantity = 1, final_price, ...rest } = action.payload;

      if (!product_id || quantity <= 0) return;

      const exists = state.cart.find(item => item.product_id === product_id);

      if (exists) {
        exists.quantity += quantity;
        exists.final_price = final_price;
      } else {
        state.cart.push({ product_id, ...rest, quantity, final_price });
      }
    },

    // decrease quantity of an item by 1 (decrease button in cart)
    removeFromCart: (state, action) => {
      const { product_id, quantity } = action.payload;

      const item = state.cart.find(item => item.product_id === product_id);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= quantity;
        } else {
          state.cart = state.cart.filter(p => p.product_id !== product_id);
        }
      }
    },
    // delete all quantities of an item (delete button in cart)
    deleteFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter(item => item.id !== id);
    },
    updateCart: (state, action) => {
      const { product_id, quantity, final_price, unit_price } = action.payload;
      const item = state.cart.find(item => item.product_id === product_id);
      if (item) {
        item.quantity = quantity;
        item.final_price = final_price;
        if (unit_price !== undefined) {
          item.unit_price = unit_price;
        }
      }
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
  updateUserTheme,
  clearUserInfo,
  setIntialCart,
  addToCart,
  removeFromCart,
  deleteFromCart,
  updateCart,
  clearCart,
  setIntialWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  clearWatchlist,
} = userSlice.actions;

export default userSlice.reducer;

