/* eslint-disable @typescript-eslint/no-explicit-any */

//library imports
import {
  addDoc,
  doc,
  getDoc,
  collection,
  updateDoc,
  deleteDoc,
  getDocs,
  where,
  query,
  DocumentData,
} from 'firebase/firestore';
//custom imports

//global database instance
import { db } from './firebaseConfig';

type Data = { [key: string]: any };

//get single item from database
async function getItembyID(collectionName: string, id: string) {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id } as DocumentData;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return { message: 'Error getting document!' };
  }
}

//get all items from collection
async function getAllItems(collectionName: string) {
  try {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    //return documents

    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.log(error);
    return null;
  }
}

//query database for item
async function queryItem(collectionName: string, field: string, value: string) {
  try {
    const q = query(collection(db, collectionName), where(field, '==', value));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    //return documents
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as DocumentData));
  } catch (error) {
    console.log(error);
    return null;
  }
}

//add item to database
async function addItem<T extends Data>(collectionName: string, data: T) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    null;
  }
}

//update item in database
async function updateItem<T extends Data>(collectionName: string, id: string, data: T) {
  console.log(id);
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);

    return { message: 'Document updated successfully!' };
  } catch (error) {
    console.log(error);
    return { message: 'Error updating document!' };
  }
}

//delete item from database
async function deleteItem(collectionName: string, id: string) {
  try {
    await deleteDoc(doc(db, collectionName, id));
    return { message: 'Document deleted successfully!' };
  } catch (error) {
    console.log(error);
    return { message: 'Error deleting document!' };
  }
}

//export functions
export { getItembyID, getAllItems, queryItem, addItem, updateItem, deleteItem };
