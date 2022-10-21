import { storage } from './clientApp';

export const handleUpload = async (
  folder: string,
  uploadedFile: File
): Promise<unknown> => {
  if (!uploadedFile) return;

  const storageRef = storage.ref(folder);

  try {
    await storageRef.child(uploadedFile.name).put(uploadedFile);
    // logger.info('Successfully uploaded picture to firebase storage');
    const downloadUrl = storageRef.child(uploadedFile.name).getDownloadURL();
    return downloadUrl;
  } catch (error) {
    // logger.error('error', error);
  }
};

export const handleDelete = async (
  folder: string,
  filename: string
): Promise<void> => {
  if (!folder || !filename) return;

  const storageRef = storage.ref(folder);
  const fileToDeleteRef = storageRef.child(filename);

  fileToDeleteRef
    .delete()
    .then(() => {
      // logger.info('Successfully deleted picture to firebase storage');
    })
    .catch((error) => {
      // logger.error('error', error);
    });
};

export default {
  handleUpload,
  handleDelete,
};

export interface StorageInterface {
  handleUpload: (folder: string, uploadedFile: File) => Promise<string>;
  handleDelete: (folder: string, filename: string) => Promise<void>;
}
