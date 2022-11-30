/* eslint-disable no-console */
import { storage, storageFunctions } from './clientApp';

const { ref, getDownloadURL, uploadBytesResumable, deleteObject } =
  storageFunctions;

interface UploadFileInterface {
  folderName: string;
  filename: string;
  uploadedFile: File;
  callBackAfterDownloadSuccess: (url: string) => void;
}

export const handleUpload = async ({
  folderName,
  filename,
  uploadedFile,
  callBackAfterDownloadSuccess,
}: UploadFileInterface) => {
  if (!uploadedFile) return '';
  const fullPath = folderName + filename;

  const storageRef = ref(storage, fullPath);
  const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

  // Listen for state changes, errors, and completion of the upload.
  return uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
          console.log(`Upload is ${snapshot.state}`);
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          console.log(`storage/unauthorized error ${error}`);
          break;
        case 'storage/canceled':
          console.log(`storage/canceled error.code ${error.code}`);
          break;

        // ...

        case 'storage/unknown':
          console.log(`storage/unknown error.code unknown`);
          break;
        default:
          console.log(`Error: ${error.code}`);
      }
    },
    async () => {
      // Upload completed successfully, now we can get the download URL
      return getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        callBackAfterDownloadSuccess(downloadURL)
      );
    }
  );
};

export const handleDelete = async ({
  folderName,
  filename,
  callBackAfterDownloadSuccess,
}: {
  folderName: string;
  filename: string;
  callBackAfterDownloadSuccess: () => void;
}): Promise<void> => {
  if (!folderName || !filename) return;

  const fullPath = folderName + filename;

  const pathReference = ref(storage, fullPath);
  // Delete the file
  deleteObject(pathReference)
    .then(() => {
      callBackAfterDownloadSuccess();
    })
    .catch((_error) => {
      // Uh-oh, an error occurred!
    });
};

export const handleDownload = async (
  folder: string,
  filename: string
): Promise<void> => {
  if (!folder || !filename) return;
  const fullPath = folder + filename;

  const pathReference = ref(storage, fullPath);
  getDownloadURL(pathReference)
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (_event) => {
        return xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
        default:
          break;
      }
    });
};

export interface StorageInterface {
  handleUpload: (
    folder: string,
    filename: string,
    uploadedFile: File
  ) => Promise<string>;
  handleDelete: (folder: string, filename: string) => Promise<void>;
  handleDownload: (folder: string, filename: string) => Promise<void>;
}
