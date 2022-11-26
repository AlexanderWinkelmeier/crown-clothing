import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink  to="/shop">
            SHOP
          </NavLink>

          {currentUser ? (
            <Navlink as="span" onClick={signOutUser}>
              {' '}
              SIGN OUT{' '}
            </Navlink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}

          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContain>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
