import { takeLatest, call, put, all } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './categories.action';

import CATEGORIES_ACTION_TYPES from './categories.types';

// ? Handler Function der "Watcher"-SAGA
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    // ruft die Funktion getCategories... mit dem Argument 'categories' auf
    yield put(fetchCategoriesSuccess(categoriesArray)); // Übergabe der Action an den Reducer
  } catch (error) {
    yield put(fetchCategoriesFailed(error)); // Übergabe der Action an den Reducer
  }
}
// ? "Watcher"-SAGA
// watched den CATEGORIES_ACTION_TYPES "FETCH_CATEGORIES_START"
// nimmt von all diesen Actions nur die letzte und ruft die "Worker" SAGA fetchCategoriesAsync auf
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// FETCH_CATEGORIES_START kommt von der shop.components.jsx, dort wurde diese in einer useEffect dispatched:
// useEffect(() => {
//   dispatch(fetchCategoriesStart());
// }, [dispatch]);

// ? Akkumulator-SAGA: enthält alle SAGAs der Datei und wird der rootSaga übergeben
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]); // rufe alle SAGAs in dieser Datei auf; hier: nur onFetchCategories
}

// jede Generator-Funktion antwortet auf Actions
// Effects: sind Bindings, die eine Verbindung zum Redux-Store herstellen
// all-effect: führe alles aus, was als Argument übergeben wurde und beende erst, wenn alles erledigt ist
// call-effect: rufe das auf, was als Argument übergeben wurde, i.d.R. eine Funktion mit oder ohne Argumente:
//  soll also eine Funktion in einen Effect überführt werden, nutzt man das call-keyword, z.B.
//  getCategoriesAndDocuments('categories') wird zu call(getCategoriesAndDocuments, 'categories')
// take--> Actions werden entgegen genommen:
//  takeEvery: jede Action eines bestimmten Action-Types wird entgegengenommen
//  takeLatest: nur die letzte Action eines bestimmten Action-Types wird entgegengenommen
// put: entspricht dem dispatch() außerhalb von Redux-SAGA, d.h. dispatched eine Action zum Reducer

// Ablauf:
// 1. die Watcher-SAGA watched auf bestimmte Actions, die in der UI regulär dispatched wurden
// 2. die Watcher-SAGA ruft daraufhin eine Handler-Funktion auf
// 3. diese Handler-Funktion führt eine bestimmte Logik aus und dispatched über put eine Action an den Reducer
// 4. der Reducer aktualisiert den State, der an beliebiger Stelle der App mit dem useSelector abgerufen werden kann

// Befinden sich mehrere SAGAs in einer Datei werden diese über eine Akkumulator-SAGA zusammengeführt und an
// die rootSAGA übergeben, die SAGAs aus diversen Dateien entgegennimmt.
