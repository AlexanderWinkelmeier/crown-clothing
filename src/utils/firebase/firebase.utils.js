import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection, // braucht man, um in firestore eine collection erstellen zu können
  writeBatch, // benötigt man, um Daten als Batch, d.h. in einem Aufwisch, in die Datenbank zu schreiben
  query, // benötigt man, um Anfragen bezüglich collections an die Datenbank firestore stellen zu können
  getDocs, // benötigt man, um documents aus firestore abrufe zu könnnen
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAneN1I5VRbdj7RWeYsmm-ek97Hpjn2tn8',
  authDomain: 'crown-clothing-db-232d2.firebaseapp.com',
  projectId: 'crown-clothing-db-232d2',
  storageBucket: 'crown-clothing-db-232d2.appspot.com',
  messagingSenderId: '657132211133',
  appId: '1:657132211133:web:c7118034314973930820d4',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// onAuthStateChange ist ein Listener, der auf Änderungen von callback horcht,
// hier: auf den State des User, d.h. ob der User eingeloggt ist oder nicht
// callback ist hier die sogenannte next-Methode bei Listenern, es können jedoch
// auch mehr callback-Funktionen an onAuthStateChanged übergeben werden, d.h. dieser
// Listener kann auch mehrere Events beobachten:
// - error: horcht auf Fehler im Stream,
// - completed: horcht darauf, wann der Stream beendet ist

// {
//   next: callback,
//   error: errorCallback,
//   complete: completeCallback
// }

// Funktion, um eine collection anzulegen und die dazugehörigen documents darin einzufügen
export const addCollectionAndDocuments = async (
  collectionKey, // Bezeichnung der collection; hier: Categories
  objectsToAdd, // die zugehörigen documents; hier: das gesamte Json-Objekt SHOP_DATA aus shop-data.js
  field = 'title'
) => {
  // die collectionRef ist der Pointer auf die collection in der Datenbank; gibt es diese collection noch nicht, so
  //  wird sie automatisch angelegt
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  // die Objekte mit der Bezeichnung field, hier: der jeweilige title (hats, sneakers...) in Kleinbuchstaben in die Datenbank mit dem collectionKey categories hochladen
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  // collectionRef --> Referenz (=Zeiger) auf die Collection categories in der Datenbank
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef); // erstellt eine Anfrage an die jeweilige collection in db

  const querySnapshot = await getDocs(q); // gibt eine Momentaufnahme der documents in dieser collection zurück
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  //  gibt die Dokumente, d.h. Categories mit items und title, als Array zurück
};

// Aufbau der Firebase-Datenbank:

// Collection enthält Dokumente und diese enthält Felder
// hier:
// Collection --> categories
// Dokumente --> hats, jackets, mens, womens, sneakers
// Felder, hier: Category --> "items" mit Unter-Feldern und "title"

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
