//library imports
import {
  ref,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

//custom imports
import { storage } from './firebaseConfig';

//uplaod image to storage bucket`
export const uploadImage = async (
  files: File[],
  path: string,
  setUploadProgress: (progress: number) => void
) => {
  console.log(files);
  try {
    const urls = await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, `images/${path}/${uuidv4()}${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Set up progress listener
        uploadTask.on(
          'state_changed',
          (snapshot: UploadTaskSnapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(progress);
          },
          (error: Error) => {
            console.error(error);
          }
        );

        await uploadTask;

        const url = await getDownloadURL(storageRef);
        setUploadProgress(0);
        return url;
      })
    );
    return urls;
  } catch (error) {
    console.error(error);
    return 'Something went wrong! Please try again.';
  }
};

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
    const listResult = await listAll(listRef);

    // Fetching URLs and metadata in parallel
    const urlAndMetadataList = await Promise.all(
      listResult.items.map(async (itemRef) => {
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
    return 'Something went wrong! Please try again.';
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
