const storageFunctions = {
  uploadFile: () => null,
  deleteFile: () => null,
  ref: () => null,
  uploadBytesResumable: () => null,
  getDownloadURL: () => null,
  deleteObject: () => null,
};

export type StorageFunctionsType = {
  uploadFile: (
    folderName: string,
    filename: string,
    uploadedFile: File
  ) => null;
  deleteFile: (folderName: string, filename: string) => null;
  ref: (fullPath: string) => null;
  uploadBytesResumable: (storageRef: null, uploadedFile: File) => null;
  getDownloadURL: (storageRef: null) => Promise<string>;
  deleteObject: (pathReference: null) => null;
};
export { storageFunctions };
