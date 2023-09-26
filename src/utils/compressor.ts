/* eslint-disable no-new */
import Compressor from 'compressorjs';

export interface CompressorOptions {
  quality: number;
  convertSize: number;
}

export function compressFile(
  file: File | Blob,
  { quality, convertSize }: CompressorOptions,
): Promise<File | Blob> {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality,
      convertSize,
      success: (compressedFile) => {
        resolve(compressedFile);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}
