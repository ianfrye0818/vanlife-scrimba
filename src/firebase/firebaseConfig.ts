// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBDpzIoKjWsUSTikt-fOx-AmtwhJl0jZUc',
  authDomain: 'vanlife3-7cc12.firebaseapp.com',
  projectId: 'vanlife3-7cc12',
  storageBucket: 'vanlife3-7cc12.appspot.com',
  messagingSenderId: '48542450040',
  appId: '1:48542450040:web:6b2cbdaf222dd7bc51c88d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
