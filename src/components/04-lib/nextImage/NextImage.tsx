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
  priority?: boolean;
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
  priority = false,
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
      priority={priority}
    />
  );
};

export default NextImage;
