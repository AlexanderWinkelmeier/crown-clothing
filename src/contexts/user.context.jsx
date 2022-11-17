import { createContext, useState } from 'react';

// hier befindet sich der aktuelle Context, der von den jeweiligen Komponenten geändert oder abgerufen werden kann
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

// dient dem Wrappen, der höchsten Komponente unterhalb derer sich die Komponenten befinden, die den Context nutzen
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// z.B. <UserProvider><App /><UserProvider/> in index.js
