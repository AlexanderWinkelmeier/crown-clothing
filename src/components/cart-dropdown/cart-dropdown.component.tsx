import { useState, useMemo, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles';

const sleep = (milliseconds: number): void => {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
};

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  // zeitintensive Funktion (2000 ms), die bei jedem Re-rendering der Komponente
  // den Rückgabewert neu berechnet, wenn kein useMemo-Hook verwendet wird
  // wird ein useMemo-Hook verwendet, wird der Rückgabewert neu berechnet, wenn
  // sich ein Wert in der Dependency-Array ändert; hier: count
  const hundredCount = useMemo(() => {
    console.log('start');
    sleep(2000);
    console.log('end');
    return 100 + count;
  }, [count]);

  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout');
  }, []);

  return (
    <CartDropdownContainer>
      <CartItems>
        {hundredCount}
        {/* {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )} */}
      </CartItems>
      <Button onClick={() => setCount(count + 1)}>CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
