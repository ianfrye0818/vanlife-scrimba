/* eslint-disable @typescript-eslint/no-explicit-any */

//library imports
import { addDoc, doc, getDoc, collection, updateDoc, deleteDoc } from 'firebase/firestore';
//custom imports

import { db } from './firebaseConfig';
//global database instance

//get single item from database
async function getItem(collectionName: string, id: string) {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return { message: 'No such document!' };
    }
  } catch (error) {
    console.log(error);
    return { message: 'Error getting document!' };
  }
}

//add item to database
async function addItem(collectionName: string, data: any) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    return { message: 'Error adding document!' };
  }
}

//update item in database
async function updateItem(collectionName: string, id: string, data: any) {
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
export { getItem, addItem, updateItem, deleteItem };
