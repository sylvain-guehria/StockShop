import { oneMegaBits } from '@/app/dashboard/inventories/(products-components)/(editPhotoForm)/EditProductFormValidation';

import { compressFile } from './compressor';

// const mockUploadedFile = new File([], 'test-file.jpg', { type: 'image/jpeg' });

describe('compressFile', () => {
  it('should reject with an error if there was a problem with the compression', async () => {
    const invalidFile = new File(
      ['This is not a valid image file.'],
      'invalid-file.txt',
      {
        type: 'text/plain',
      }
    );
    await expect(
      compressFile(invalidFile, { quality: 0.8, convertSize: oneMegaBits })
    ).rejects.toThrow();
  });
});
