import { combineReducers } from 'redux';
import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});

// Der rootReducer enthält ein Objekt aus key-value-pairs der jeweiligen Reducer
// Diese Reducer können über ihren key angesprochen werden und geben dann  ihren Value zurück
