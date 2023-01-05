// ? Datei aus ACTIONS, die an den Reducer dispatched werden, bestehend jeweils aus
// dem Action Type und evtl. einem Payload

import { CATEGORIES_ACTION_TYPES, Category } from './categories.types';
import {
  createAction, // Funktion, die eine Action erstellt
  Action, // ohne Payload
  ActionWithPayload, // mit Payload
  withMatcher,
} from '../../utils/reducer/reducer.utils';

// !Datentypen der drei Action-Creators
// d.h. welche Datentypen sollen jeweils für die drei Action Types verwendet werden
export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FetchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

// ! Typisierung der drei synchronen Action-Creators
export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: Category[]): FetchCategoriesSuccess =>
    createAction(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    )
);
export const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCategoriesFailed =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);
