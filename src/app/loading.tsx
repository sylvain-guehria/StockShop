import loadingGif from 'public/loading.gif';

import NextImage from '@/components/lib/nextImage/NextImage';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-white">
      <NextImage src={loadingGif} alt="loading-gif" />
    </div>
  );
}
