import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getCurrentUser,
} from './utils/firebase/firebase.utils.js';

import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.action';

const App = () => {
  const dispatch = useDispatch();
  // ? überprüft, ob es gegenwärtig einen angemeldeten User gibt
  useEffect(() => {
    // abonniert einen Auth-State-Listener
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);//--> Firebase
    //   }
    //   dispatch(setCurrentUser(user)); --> Redux-Store
    // });
    // return unsubscribe; // --> de-abonniert den Auth-State-Listener wieder
    // Alternative: Promise-Ansatz wegen Redux-Saga
    getCurrentUser().then((user) => console.log('Signed User', user));
  }, [dispatch]); // dispatch ändert sich nie, kann daher auch weggelassen werden

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
