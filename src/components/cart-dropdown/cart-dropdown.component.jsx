import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';

const CartDropDown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        <CartItem />
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropDown;
