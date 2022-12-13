import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

// Currying
// const curryFunc = (a) => (b, c) => {
//    a + b - c
// }

// Helper-Funktionen, die wiederverwendbar sind:
// const with3 = curryFunc(3)
// const with10 = curryFunc(10)

// with3(2,4) // 3 + 2 - 4
// with10(2,9) // 3 + 2 - 9

// selbst erstellte logger Middleware
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    next(action); // aktualisiert die Reducer im Redux-Store
  }
  // Action und previous State
  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action); // aktualisiert die Reducer im Redux-Store

  // current State
  console.log('next State: ', store.getState());
};

const persistConfig = {
  key: 'root', // wo soll gestartet werden: 'root' bedeutet, dass alles gespeichert werden soll
  storage: storage, // wo soll gespeichert werden: im lokal storage des Browsers
  blacklist: ['user'],
  // welche Reducer-Werte sollen vom Speichern im Web-Browser ausgeschlossen werden: hier: 'user', d.h. die
  // Werte des userReducer (vgl. root-reducer.js)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
