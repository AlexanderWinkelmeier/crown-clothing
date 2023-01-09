import { Middleware } from 'redux';

import { RootState } from '../store';

// selbst erstellte logger Middleware
export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
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
