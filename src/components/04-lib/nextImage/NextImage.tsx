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
  fill?: boolean;
  style?: React.CSSProperties;
  sizes?: string;
};

const NextImage: FC<Props> = ({
  alt,
  src,
  placeholder,
  className,
  width,
  height,
  fill = false,
  style,
  sizes,
}) => {
  return (
    <Image
      alt={alt}
      src={src}
      placeholder={placeholder}
      className={className}
      width={width}
      height={height}
      fill={fill}
      style={style}
      sizes={sizes}
    />
  );
};

export default NextImage;
