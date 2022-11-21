import { createContext, useState, useEffect } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
  // befindet sich das hinzugefügte Produkt bereits im Warenkorb
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // a) es befindet sich bereits im Warenkorb --> Menge um eins erhöhen
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // es befindet sich noch nicht im Warenkorb: Produkt dem Warenkorb hinzufügen
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // das Produkt, das gelöscht werden soll, im Warnkorb finden
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // ist die Menge dieses Produkts im Warenkorb 1, soll diese letzte Produkt gelöscht werden
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove);
    // gibt ein leeres CartItems-Array zurück
  }
  // ist die Menge dieses Produkts im Warenkorb größer als ein, soll dessen Anzahl um 1 verringert werden
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Funktion mit Logik zum Ändern des Warenkorbs
  // hinsichtlich Inhalb bzw. Menge der Produkte
  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const removeItemToCart = (CartItemToRemove) =>
    setCartItems(removeCartItem(cartItems, CartItemToRemove));

  useEffect(() => {
    // total ist der accumulator cartItem das currentElement
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);
  // immer wenn sich irgendeine Property von cartItems ändert; hier: die quantity
  // dann soll die Menge der cartItems neu berechnet werden

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeCartItem,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
