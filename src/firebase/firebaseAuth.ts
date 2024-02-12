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
import { auth } from './firebaseConfig';

//create user with email and password
async function createUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.log(error);
    return { message: 'Error creating user!' };
  }
}

//sign in user with email and password
async function signInUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.log(error);
    return { message: 'Error signing in' };
  }
}

//sign in user with google
async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
}

//sign in user with github
async function signInWithGithub() {
  try {
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
}

//logout user
async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
}

export { createUser, logoutUser, signInUser, signInWithGoogle, signInWithGithub };
