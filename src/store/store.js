import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// import { loggerMiddleware } from './middleware/logger';
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root', // wo soll gestartet werden: 'root' bedeutet, dass alles gespeichert werden soll
  storage: storage, // wo soll gespeichert werden: im lokal storage des Browsers
  whitelist: ['cart'], // nur der Warenkorb soll über Sessions hinweg gespeichert werden und beim Neuladen der Seite
  // nicht gelöscht werden
  // welche Reducer-Werte sollen vom Speicher im Web-Browser enthalten sein: hier: 'cart', d.h. die
  // Werte des userReducer (vgl. root-reducer.js)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  thunk,
].filter(Boolean); // Alternative: loggerMiddleware
// die logger-Middleware und Thunk-Middleware sollen nur im Entwicklungs-Modus verwendet werden und etwas in die Konsole loggen

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
