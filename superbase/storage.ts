/* eslint-disable no-console */
import type { StorageFunctionsType } from './storageFunctions';

interface UploadFileInterface {
  folderName: string;
  filename: string;
  uploadedFile: File;
}

interface DeleteFileInterface {
  folderName: string;
  filename: string;
}

interface HandleDownload {
  folderName: string;
  filename: string;
}

class StorageService {
  storageFunctions;

  constructor(storageFunctions: StorageFunctionsType) {
    this.storageFunctions = storageFunctions;
  }

  async handleUpload({
    folderName,
    filename,
    uploadedFile,
  }: UploadFileInterface): Promise<any> {
    if (!uploadedFile) return '';
    const fullPath = folderName + filename;

    const storageRef = this.storageFunctions.ref(fullPath);
    await this.storageFunctions.uploadBytesResumable(storageRef, uploadedFile);
    const downloadURL = await this.storageFunctions.getDownloadURL(storageRef);
    return downloadURL;
  }

  async handleDelete({
    folderName,
    filename,
  }: DeleteFileInterface): Promise<void> {
    if (!folderName || !filename) return;

    const fullPath = folderName + filename;

    const pathReference = this.storageFunctions.ref(fullPath);
    // Delete the file
    await this.storageFunctions.deleteObject(pathReference);
  }

  async handleDownload({
    folderName,
    filename,
  }: HandleDownload): Promise<void> {
    if (!folderName || !filename) return;
    const fullPath = folderName + filename;

    const pathReference = this.storageFunctions.ref(fullPath);
    this.storageFunctions
      .getDownloadURL(pathReference)
      .then((url: string) => {
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
      .catch((error: any) => {
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
  }
}

export default StorageService;
