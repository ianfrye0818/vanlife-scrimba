// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB4E-0R3bm0MBXeYtgTEgwmPn0C4IPgBt8',
  authDomain: 'vanlife-692c6.firebaseapp.com',
  projectId: 'vanlife-692c6',
  storageBucket: 'vanlife-692c6.appspot.com',
  messagingSenderId: '1005264753839',
  appId: '1:1005264753839:web:995adf1811db397561f05a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
