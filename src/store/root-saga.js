import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './categories/categories-saga';
import { userSagas } from './user/user.saga';

// Generator-Funktion
export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSagas)]);
}

// ruft alle SAGAs im Array der SAGAs auf
