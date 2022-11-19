import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  // const toggleIsCartOpen = () => {
  //   if (isCartOpen) {
  //     setIsCartOpen(false);
  //   } else {
  //     setIsCartOpen(true);
  //   }
  // };

  // Kurzform

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">1</span>
    </div>
  );
};

export default CartIcon;
