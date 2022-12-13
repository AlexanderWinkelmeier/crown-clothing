import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// import { loggerMiddleware } from './middleware/logger';
import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root', // wo soll gestartet werden: 'root' bedeutet, dass alles gespeichert werden soll
  storage: storage, // wo soll gespeichert werden: im lokal storage des Browsers
  blacklist: ['user'],
  // welche Reducer-Werte sollen vom Speichern im Web-Browser ausgeschlossen werden: hier: 'user', d.h. die
  // Werte des userReducer (vgl. root-reducer.js)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(
  Boolean
); // Alternative: loggerMiddleware
// die logger-Middleware soll nur im Entwicklungs-Modus verwendet werden und etwas in die Konsole loggen

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// wenn man sich im Entwickler-Modus befindet, es ein window-Objekt gibt und die REDUX-DEVTOOLS-Erweiterung existiert,
// dann soll diese compose (Zusammenstellung) verwendet werden. Ansonsten verwende die compose von Redux
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
