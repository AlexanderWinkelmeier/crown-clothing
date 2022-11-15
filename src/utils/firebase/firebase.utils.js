import { initializeApp } from 'firebase/app';
// Für weitere Infos siehe
// https://firebase.google.com/docs/web/setup?authuser=0&hl=de
// https://firebase.google.com/docs/web/setup?authuser=0&hl=de
// https://firebase.google.com/docs/web/setup#available-libraries
// https://firebase.google.com/docs/reference/js/?authuser=0&hl=de

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

// weitere Infos https://firebase.google.com/docs/auth/web/google-signin?authuser=0&hl=de

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAneN1I5VRbdj7RWeYsmm-ek97Hpjn2tn8',
  authDomain: 'crown-clothing-db-232d2.firebaseapp.com',
  projectId: 'crown-clothing-db-232d2',
  storageBucket: 'crown-clothing-db-232d2.appspot.com',
  messagingSenderId: '657132211133',
  appId: '1:657132211133:web:c7118034314973930820d4',
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
// verknüpft die erstellte Instanz der App mit der Konfiguration
// dadurch kann man mit seiner eigenen Instanz von Firebase interagieren;
// hier: CRUD-Operations und Authentifizierung

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  // Datenbank, Collection, eine unique ID (uid) aus der Authentifizierung

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot);
  console.log(userSnapshot.exists());
};
