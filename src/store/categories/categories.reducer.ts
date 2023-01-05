// ? Reducer-Datei
//  d.h. enthält den Reducer, der den aktuellen State und je nach Action Type einen
// aktualisierten State zurückgibt

import { CATEGORIES_ACTION_TYPES, Category } from './categories.types';
import { CategoryAction } from './categories.action';

// Typisierung des Initial State
export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

// die Werte des Initial State
export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

// der Reducer
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as CategoryAction // Typisierung der action über Type-Assertion mit "as": discriminating union: action kann nur eine der drei Action-Types sein
): CategoriesState => {
  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, isLoading: false };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};
