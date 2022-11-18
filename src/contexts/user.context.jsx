import { createContext, useState, useEffect } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils.js';

// hier befindet sich der aktuelle Context, der von den jeweiligen Komponenten geändert oder abgerufen werden kann
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

// dient dem Wrappen, der höchsten Komponente unterhalb derer sich die Komponenten befinden, die den Context nutzen
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        // wird zum Erstellen eines Users in Firebase benötigt, wenn mit Google eingeloggt wird
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// z.B. <UserProvider><App /><UserProvider/> in index.js
