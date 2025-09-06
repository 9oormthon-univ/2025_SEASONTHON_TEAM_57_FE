import clsx from 'clsx';
import Image, { type StaticImageData } from 'next/image';

import Bookmark from '@/public/post/bookmark.svg';
import Message from '@/public/post/message.svg';

import SvgBox from './SvgBox';

type GalleryImage = {
  src: string | StaticImageData;
  alt?: string;
};

type Props = {
  title: string;
  content: string;
  images?: GalleryImage[];
  className?: string;
  ctn_bookmark?: number;
  ctn_message?: number;
};

export default function TextWithGallery({
  title,
  content,
  images,
  className,
  ctn_bookmark,
  ctn_message,
}: Props) {
  const hasImages = Array.isArray(images) && images.length > 0;

  return (
    <section className={clsx('rounded-[1.2rem] pt-[2.0rem] space-y-[1.6rem]', className)}>
      <h2 className="text-[var(--black)]">{title}</h2>

      {hasImages && (
        <div
          className={clsx(
            'px-[2.0rem] py-[0.8rem]',
            'overflow-x-auto scrollbar-hidden',
            'flex gap-[1.2rem]',
            'snap-x snap-mandatory'
          )}
          aria-label="image gallery"
          role="group"
        >
          {images!.map((img, i) => (
            <div
              key={i}
              className={clsx(
                'relative overflow-hidden rounded-[1.2rem]',
                'h-[12.0rem] w-[18.0rem]',
                'flex-shrink-0 snap-start'
              )}
            >
              <Image
                src={img.src}
                alt={img.alt ?? ''}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 180px, 240px"
                priority={i < 2}
              />
            </div>
          ))}
        </div>
      )}

      <p className="body2 text-[var(--black)] mb-[2rem]">{content}</p>
      <div className="flex items-center">
        <div className="flex items-center gap-[0.4rem]">
          <SvgBox
            Icon={Bookmark}
            size={16}
            viewBox="0 0 16 16"
          />
          <p className="body3 text-[var(--gray2)]">{ctn_bookmark}</p>
        </div>

        <div className="flex items-center gap-[0.4rem] ml-[0.8rem]">
          <SvgBox
            Icon={Message}
            size={16}
            viewBox="0 0 16 16"
          />
          <p className="body3 text-[var(--gray2)]">{ctn_message}</p>
        </div>
      </div>
    </section>
  );
}
