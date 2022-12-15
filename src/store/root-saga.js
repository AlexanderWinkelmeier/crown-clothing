import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './categories/categories-saga';

// Generator-Funktion
export function* rootSaga() {
  yield all([call(categoriesSaga)]);
}
