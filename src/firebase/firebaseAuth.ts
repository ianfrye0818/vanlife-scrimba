//library imports
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
//custom imports
import { app } from './firebaseConfig';

//global auth instance
const auth = getAuth(app);

//sign in user with email and password
async function signInUser(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
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

//signup user with email and password
async function signUpUser(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
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

export { auth, signUpUser, logoutUser, signInUser, signInWithGoogle, signInWithGithub };
