/* eslint-disable @typescript-eslint/no-explicit-any */
//library imports
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';

//custom imports
import { app } from './firebaseConfig';

//global storage instance
const storage = getStorage(app);

//get file from storage
async function downloadFile(path: string) {
  try {
    const storageRef = ref(storage, path);
    // Get the download URL
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.log(error);
  }
}

//upload file to storage
async function uploadFile(path: string, file: any) {
  const fileName = file.name + Date.now();
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, fileName);
  } catch (error) {
    console.log(error);
  }
}

//delete file from storage
async function deleteFile(path: string) {
  try {
    const storageRef = ref(storage, path);
    // Delete the file
    await deleteObject(storageRef);
  } catch (error) {
    console.log(error);
  }
}

//list files in storage
async function listFiles(path: string) {
  try {
    const storageRef = ref(storage, path);
    // Find all the prefixes and items.
    const res = await listAll(storageRef);
    return res;
  } catch (error) {
    console.log(error);
  }
}

//export functions
export { downloadFile, uploadFile, deleteFile, listFiles };
