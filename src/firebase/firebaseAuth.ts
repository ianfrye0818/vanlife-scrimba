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
import { addItem, queryItem } from './firebaseDatabase';

async function checkAndAddUser(email: string, uid: string) {
  console.log('email: ', email);
  const dbUser = await queryItem('users', 'email', email);
  if (!dbUser) {
    await addItem('users', {
      name: '',
      uid,
      email: email,
      hostId: '',
      hostVans: [],
      transactions: [],
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
    console.log(error);
    if (error instanceof Error) alert(error.message);
    return null;
  }
}

//sign in user with email and password
async function signInUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userdb = await checkAndAddUser(email, userCredential.user.uid);
    console.log(userdb);
    return userCredential.user;
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
  }
}

//logout user
async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof Error) alert(error.message);
    console.log(error);
  }
}

export { createUser, logoutUser, signInUser, signInWithGoogle, signInWithGithub };
