import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
