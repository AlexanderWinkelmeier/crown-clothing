import { createContext, useEffect, useReducer } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils.js';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

//! ACTION TYPES
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

// ! REDUCER
// ein Reducer nimmt den gegenwärtigen State und eine bestimmte action entgegen und
// gibt einen neuen State abhängig von der action zurück: die action bestimmt, welchen Fall (case)
// der Reducer auf den gegenwärtigen State anwenden soll
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

// ! INITIAL STATE
// der initial State ist der Ausgangs-State, der State mit dem beim Starten der App begonnen wird
const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  // ! USEREDUCER-HOOK
  // dieser Hook nimmt die Reducer-Funktion und den initial State entgegen und gibt den neuen State und die
  // dispatch-Funktion zurück
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const { currentUser } = state;

  // ! DISPATCHER
  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
