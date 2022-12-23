import { takeLatest, all, call, put } from 'redux-saga/effects';
import { USER_ACTION_TYPES } from './user.types';
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
} from './user.action';
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from '../../utils/firebase/firebase.utils';

// ? ###################   CHECK USER SESSION   #########################################

// 4)
// "Worker-Saga 2": holt Daten vom Benutzer
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapShot = yield call(
      createUserDocumentFromAuth, // --> Firebase
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })); // --> Reducer
  } catch (error) {
    yield put(signInFailed(error)); // --> Reducer
  }
}
// 3) "Worker-Saga 1": prüft, ob der Benutzer angemeldet ist
export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser); // --> firebase
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth); // --> "Worker-Saga 2"
  } catch (error) {
    yield put(signInFailed(error)); // --> Reducer
  }
}

// 2) "Watcher-Saga A", die auf "CHECK_USER_SESSION" horcht, die in app.js in useEffect dispatched wird
export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated); // --> "Worker-Saga 1"
}
// ? ##################      END CHECK USER SESSION   ###############################################################

// * ############################### SIGN IN WITH GOOGLE ################################

// c) "Worker-Saga I"
export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup); // --> firebase
    yield call(getSnapshotFromUserAuth, user); // --> "Worker-Saga 2"
  } catch (error) {
    yield put(signInFailed(error)); // --> Reducer
  }
}

// b) "Watcher-Saga B", die auf "GOOGLE_SIGN_IN_START" horcht, die sich in sign-in-form-component.jsx befindet
export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle); // -- "Worker-Saga I"
}

// * ###############   END SIGN IN WITH GOOGLE ##############################################

// ! ############## SIGN IN WITH E-MAIL AND PASSWORD ##############################

// z) "Worker-Saga alpha"

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    ); // --> firebase
    yield call(getSnapshotFromUserAuth, user); // --> "Worker-Saga 2"
  } catch (error) {
    yield put(signInFailed(error)); // --> Reducer
  }
}

// y) "Watcher-Saga X", die auf "EMAIL_SIGN_IN_START" horcht, die sich in sign-in-form-component.jsx befindet
export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail); // --> "Worker-Saga alpha"
}

// ! ############## END SIGN IN WITH E-MAIL AND PASSWORD ##############################

// ? ############### SIGN UP ####################################################

// "Worker-Saga"
export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails); // --> "Worker-Saga 2"
}

// "Watcher-Saga"
export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// "Worker-Saga"
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword, // --> firebase
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName })); // --> User-Saga, nicht Reducer!
  } catch (error) {
    yield put(signUpFailed(error)); // --> User-Saga, nicht Reducer!
  }
}
// "Watcher-Saga"
export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}
// ? ############### END SIGN UP ####################################################

// * ###############  SIGN OUT ###################################################

// "Worker-Saga"
export function* signOut() {
  try {
    yield call(signOutUser); // --> firebase
    yield put(signOutSuccess()); // --> Reducer
  } catch (error) {
    yield put(signOutFailed(error)); // --> Reducer
  }
}

// "Watcher-Saga"
export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}
// * ############### END  SIGN OUT ###################################################

// 5)
export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}

// Ablauf "CHECK USER SESSION"
// 1) siehe App.js: hier wird CHECK_USER_SESSION dispatched
// 2) "Watcher-Saga A" nimmt davon die letzte Action entgegen und
//     gibt an isUserAuthenticated, der "Worker-Saga 2" weiter
// 3) "Worker-Saga 2":
//     - ruft getCurrentUser in firebase.utils.js auf:
//       gibt authentifizierten User zurück oder nicht
//     - existiert ein authentifizierter User:
//       ruft getSnapshotFromUserAuth mit userAuth auf
// 4) gibt Snapshot, d.h. Daten, von User zurück oder nicht
//  wenn Daten kommen --> weiterleiten an den Reducer mittels put
// 5) übergibt akkumulierte Saga an rootSaga

//  Ablauf SIGN IN WITH GOOGLE
// a) siehe sign-in-form.component.js: hier wird GOOGLE_SIGN_IN_START dispatched
// b) "Watcher-Saga B" nimmt davon die letzte Action entgegen und
//     gibt an isUserAuthenticated, der "Worker-Saga I" weiter:
//  diese dann an "Worker Saga 2" bzw. den Reducer
// ansonsten wie oben

// Ablauf SIGN IN WITH E-MAIL AND PASSWORD
// i) siehe sign-in-form.component.js: hier wird EMAIL_SIGN_IN_START dispatched
// ii) "Watcher-SAGA X" nimmt davon die letzte Action entgegen und
//     gibt an  "Worker-Saga alpha" weiter usw.
