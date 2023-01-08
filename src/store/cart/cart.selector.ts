import { createSelector } from 'reselect';

import { CartState } from './cart.reducer';

const selectCartReducer = (state): CartState => state.cart; // State-Slice

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);

// Anmerkungen zu createSelector von 'reselect':
// Eine Bibliothek zur Erstellung von memoisierten "Selektor"-Funktionen. Häufig mit Redux verwendet, aber verwendbar mit jeder einfachen JS unveränderliche Daten als gut.

// Selektoren können abgeleitete Daten berechnen, so dass Redux den minimal möglichen Zustand speichern kann.
// Selektoren sind effizient. Ein Selektor wird nicht neu berechnet, es sei denn, eines seiner Argumente ändert sich.
// Selektoren sind komponierbar. Sie können als Eingabe für andere Selektoren verwendet werden.

// --> https://github.com/reduxjs/reselect
