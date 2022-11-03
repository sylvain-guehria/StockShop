import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import type { FC } from 'react';

type Props = {
  alt: string;
  src: string | StaticImageData;
  placeholder?: 'blur' | 'empty';
  className?: string;
  width?: number;
  height?: number;
};

const NextImage: FC<Props> = ({
  alt,
  src,
  placeholder,
  className,
  width,
  height,
}) => {
  return (
    <Image
      alt={alt}
      src={src}
      placeholder={placeholder}
      className={className}
      width={width}
      height={height}
    />
  );
};

export default NextImage;
