/* eslint-disable @typescript-eslint/no-explicit-any */
//library imports
import { getDatabase, ref, get, set } from 'firebase/database';

//custom imports
import { app } from './firebaseConfig';

//global database instance
const db = getDatabase(app);

//get all items from database
async function getAllItems(collection: string) {
  try {
    const items = await get(ref(db, collection));
    return items.val();
  } catch (error) {
    console.log(error);
  }
}

//get single item from database
async function getSingleItem(collection: string, id: string) {
  try {
    const item = await get(ref(db, `${collection}/${id}`));
    return item.val();
  } catch (error) {
    console.log(error);
  }
}

//add item to database
async function addItem(collection: string, data: any) {
  try {
    await set(ref(db, collection), data);
  } catch (error) {
    console.log(error);
  }
}

//update item in database
async function updateItem(collection: string, id: string, data: any) {
  try {
    await set(ref(db, `${collection}/${id}`), data);
  } catch (error) {
    console.log(error);
  }
}

//delete item from database
async function deleteItem(collection: string, id: string) {
  try {
    await set(ref(db, `${collection}/${id}`), null);
  } catch (error) {
    console.log(error);
  }
}

//export functions
export { getAllItems, getSingleItem, addItem, updateItem, deleteItem };
