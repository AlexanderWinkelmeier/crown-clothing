// ! 1) Die Firebase-App aufsetzen
import { initializeApp } from 'firebase/app';
// Für weitere Infos siehe
// https://firebase.google.com/docs/web/setup?authuser=0&hl=de
// https://firebase.google.com/docs/web/setup?authuser=0&hl=de
// https://firebase.google.com/docs/web/setup#available-libraries
// https://firebase.google.com/docs/reference/js/?authuser=0&hl=de

// ! 2) Die Authentifizierung aufsetzen
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

// weitere Infos https://firebase.google.com/docs/auth/web/google-signin?authuser=0&hl=de

// ! 3) Die Datenbank Firestore aufsetzen
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// ! 4) Die Firebase-App-Konfiguration erstellen
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAneN1I5VRbdj7RWeYsmm-ek97Hpjn2tn8',
  authDomain: 'crown-clothing-db-232d2.firebaseapp.com',
  projectId: 'crown-clothing-db-232d2',
  storageBucket: 'crown-clothing-db-232d2.appspot.com',
  messagingSenderId: '657132211133',
  appId: '1:657132211133:web:c7118034314973930820d4',
};

// ! 5) Firebase initialisieren

const firebaseApp = initializeApp(firebaseConfig);
// verknüpft die erstellte Instanz der App mit der Konfiguration
// dadurch kann man mit seiner eigenen Instanz von Firebase interagieren;
// hier: CRUD-Operations und Authentifizierung

// ! 6) Einen provider erstellen und diesen parametrisieren
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// ! 7) Authenfizierung instanzieren und Sign-in-Methode wählen
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// ! 8) Firestore instanzieren
export const db = getFirestore();

// ! 9) Ein UserDocument in Firestore erstellen
export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  // Datenbank, Collection, eine unique ID (uid) aus der Authentifizierung

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }

    return userDocRef; // wenn die userSnapshot existiert
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createAuthUserWithEmailAndPassword(auth, email, password);
};
// Anmerkung: die jeweiligen Variablen werden in sign-in-components importiert
