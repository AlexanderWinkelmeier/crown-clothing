// Aus firebase werden Funktionen von:
// - 'firebase/app', --> zum generellen  Verbinden von firebase mit dem Frontend, also react
// - 'firebase/auth' und --> zum Verbinden vom Modul Auth mit dem Frontend
// - 'firebase/firestore' --> zum Verbinden des Firestore mit dem Frontend
// importiert
// ? Importe
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  //Google
  GoogleAuthProvider, // ist eine Klasse
  signInWithRedirect,
  signInWithPopup,
  //Email/Password
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // #############
  signOut,
  onAuthStateChanged, // Auth-State-Listener
  User,
  NextOrObserver,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection, // braucht man, um in firestore eine collection erstellen zu können
  writeBatch, // benötigt man, um Daten als Batch, d.h. in einem Aufwisch, in die Datenbank zu schreiben
  query, // benötigt man, um Anfragen bezüglich collections an die Datenbank firestore stellen zu können
  getDocs, // benötigt man, um documents aus firestore abrufen zu könnnen
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import { Category } from '../../store/categories/categories.types';

//  ? Konfigurations-Objekt
const firebaseConfig = {
  apiKey: 'AIzaSyAneN1I5VRbdj7RWeYsmm-ek97Hpjn2tn8',
  authDomain: 'crown-clothing-db-232d2.firebaseapp.com',
  projectId: 'crown-clothing-db-232d2',
  storageBucket: 'crown-clothing-db-232d2.appspot.com',
  messagingSenderId: '657132211133',
  appId: '1:657132211133:web:c7118034314973930820d4',
};

//  ? Firebase App initialisieren
initializeApp(firebaseConfig);

// ? Services initialisieren
export const auth = getAuth();
// Mit Firestore-Datenbank verbinden
export const db = getFirestore();

//  ! AUTHENTIFIZIERUNG

// * 1) mit Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
// man wird in der UI aufgefordert, ein Konto von Google zum Einloggen auszuwählen

// 1. Methode, sich mit Google anzumelden
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
// 2. Methode, sich mit Google anzumelden
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Anlegen eines Benutzers in Firebase

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User, // zu registrierender User, das User-Object
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return; // wenn kein User eingegeben wurde --> Abbruch des Codes!

  const userDocRef = doc(db, 'users', userAuth.uid); // Anlegen Dokuments einer 'users'-Collection: Pointer

  const userSnapshot = await getDoc(userDocRef); // Momentaufnahme (= aktueller Zustatand) des Dokuments: Daten

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    // Erstellung eines Users als Dokument
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// * 2) mit E-Mail-Adresse und Passwort
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// Auth-State-Listener, der Änderungen im Status des aktuell sich auf der Seite
// befindlichen User (hier:als callback bezeichnet) achtet, d.h. ob er von eingeloggt zu ausgeloggt wechsel, umgekehrt
// oder von nicht registriert zu registriert wechselt
// diese Funktion gibt eine Variable zurück, bei deren Aufruf das Abo an diesen Listener
// wieder beendet wird, d.h. dieser Listener nicht mehr auf Auth-State-Änderungen achtet
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

// Alternativer Ansatz als Promise-Variante

// Listener, der Authorisierungs-Änderungen beobachtet: onAuthStateChanged
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe(); // deabonniert die Beobachtung
        resolve(userAuth);
      },
      reject
    );
  });
};

// !FIRESTORE

export type ObjectToAdd = {
  title: string;
};

// Funktion, um eine collection anzulegen und die dazugehörigen documents darin einzufügen
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string, // Bezeichnung der collection, die man hinzufügen möchte; hier: Categories
  objectsToAdd: T[] // die zugehörigen documents; hier: das gesamte Json-Objekt SHOP_DATA aus shop-data.js
): Promise<void> => {
  // die collectionRef ist der Pointer auf die collection in der Datenbank; gibt es diese collection noch nicht, so
  //  wird sie automatisch angelegt
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  // die Objekte mit der Bezeichnung field, hier: der jeweilige title (hats, sneakers...) in Kleinbuchstaben in die Datenbank mit dem collectionKey categories hochladen
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  // collectionRef --> Referenz (=Zeiger) auf die Collection categories in der Datenbank
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef); // erstellt eine Anfrage an die jeweilige collection in db

  const querySnapshot = await getDocs(q); // gibt eine Momentaufnahme der documents in dieser collection zurück
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
  //  gibt die Dokumente, d.h. Categories mit items und title, als Array zurück
};

// Aufbau der Firebase-Datenbank:

// Collection enthält Dokumente und diese enthält Felder
// hier:
// Collection --> categories
// Dokumente --> hats, jackets, mens, womens, sneakers
// Felder, hier: Category --> "items" mit Unter-Feldern und "title"
