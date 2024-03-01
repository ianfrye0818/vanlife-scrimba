//library imports

//custom imports
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

//global auth instance
import { auth, db } from './firebaseConfig';
import { queryItem } from './firebaseDatabase';
import { doc, setDoc } from 'firebase/firestore';

async function checkAndAddUser(email: string, uid: string) {
  const dbUser = await queryItem('users', 'uid', uid);
  if (!dbUser) {
    await setDoc(doc(db, 'users', uid), {
      name: '',
      uid,
      email: email,
      hostId: '',
      hostVans: [],
      transactions: [],
      orders: [],
    });
  }
}

//create user with email and password
async function createUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await checkAndAddUser(email, userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) alert(error.message);
    return null;
  }
}

//sign in user with email and password
async function signInUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) alert(error.message);
    return null;
  }
}

//sign in user with google
async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
    await checkAndAddUser(user.user.email as string, user.user.uid);
  } catch (error) {
    if (error instanceof Error) alert(error.message);
    console.error(error);
  }
}

//sign in user with github
async function signInWithGithub() {
  try {
    const provider = new GithubAuthProvider();
    const user = await signInWithPopup(auth, provider);
    await checkAndAddUser(user.user.email as string, user.user.uid);
  } catch (error) {
    if (error instanceof Error) alert(error.message);
    console.error(error);
  }
}

//logout user
async function logoutUser() {
  try {
    await signOut(auth);
    localStorage.removeItem('cartId');
  } catch (error) {
    if (error instanceof Error) alert(error.message);
    console.error(error);
  }
}

export { createUser, logoutUser, signInUser, signInWithGoogle, signInWithGithub };
