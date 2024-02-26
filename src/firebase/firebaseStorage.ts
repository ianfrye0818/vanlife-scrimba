//library imports
import {
  ref,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
  FullMetadata,
  uploadBytes,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
export type metaData = {
  url: string;
  metadata: FullMetadata;
};

//custom imports
import { storage } from './firebaseConfig';

//uplaod image to storage bucket`
export async function uploadImage(files: File[], path: string) {
  try {
    const metadata = await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, `images/${path}/${uuidv4()}${file.name}`);
        await uploadBytes(storageRef, file);
        const data = await getAllDownloadUrlsFromUserFolder(path);
        return data || [];
      })
    );
    return metadata.flat() as metaData[];
  } catch (error) {
    console.error(error);
    return null;
  }
}

//get download url from storage bucket
export async function getDownloadUrl(path: string) {
  try {
    const imageRef = ref(storage, path);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error(error);
    return 'Something went wrong! Please try again.';
  }
}

//getdownload urls and metadata from storage bucket (sorted by date modified)
export async function getAllDownloadUrlsFromUserFolder(id: string) {
  try {
    const listRef = ref(storage, `images/${id}`);
    const urlAndMetadataList = await Promise.all(
      (
        await listAll(listRef)
      ).items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        return { url, metadata };
      })
    );
    // Sort by date modified
    const sortedUrlList = urlAndMetadataList.sort((a, b) => {
      // Parse date modified from metadata
      const dateA = new Date(a.metadata.updated);
      const dateB = new Date(b.metadata.updated);
      // Compare dates
      return dateB.getTime() - dateA.getTime(); // descending order
    });

    return sortedUrlList;
  } catch (error) {
    console.error(error);
    return null;
  }
}

//delete image from storage
export async function deleteImage(path: string) {
  try {
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
    return 'Image deleted successfully!';
  } catch (error) {
    console.error(error);
    return 'Something went wrong! Please try again.';
  }
}

//delete all images from storage
export async function deleteAllImages(id: string) {
  try {
    const listRef = ref(storage, `images/${id}`);
    const listResult = await listAll(listRef);
    await Promise.all(listResult.items.map((itemRef) => deleteObject(itemRef)));
    return 'All images deleted successfully!';
  } catch (error) {
    console.error(error);
    return 'Something went wrong! Please try again.';
  }
}

//delete user folder from storage
export async function deleteUserFolder(id: string) {
  try {
    const folderRef = ref(storage, `images/${id}`);
    await deleteObject(folderRef);
    return 'User folder deleted successfully!';
  } catch (error) {
    console.error(error);
    return 'Something went wrong! Please try again.';
  }
}
