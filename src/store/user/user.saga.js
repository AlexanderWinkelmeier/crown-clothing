import { takeLatest, all, call, put } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signInSuccess, signInFailed } from './user.action';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

// 4)
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapShot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}
// 3) "Worker-Saga"
export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// 2) "Watcher-Saga", die auf "CHECK_USER_SESSION" horcht, die in app.js in useEffect dispatched wird
export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

// 5)
export function* userSagas() {
  yield all([onCheckUserSession]);
}

// Ablauf:
// 1) siehe App.js: hier wird CHECK_USER_SESSION dispatched
// 2) "Watcher-SAGA" nimmt davon die letzte Action entgegen und
//     gibt an isUserAuthenticated, der "Worker-Saga" weiter
// 3) "Worker-SAGA":
//     - ruft getCurrentUser in firebase.utils.js auf:
//       gibt authentifizierten User zurück oder nicht
//     - existiert ein authentifizierter User:
//       ruft getSnapshotFromUserAuth mit userAuth auf
// 4) gibt Snapshot, d.h. Daten, von User zurück oder nicht
//  wenn Daten kommen --> weiterleiten an den Reducer mittels put
// 5) übergibt akkumulierte Saga an rootSaga
