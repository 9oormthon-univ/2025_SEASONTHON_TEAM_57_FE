// app/_components/TextWithGallery.tsx
import clsx from 'clsx';
import Image, { type StaticImageData } from 'next/image';

import Bookmark from '@/public/post/bookmark.svg';
import Message from '@/public/post/message.svg';

import SvgBox from './SvgBox';

type GalleryImage = {
  /** public/ 경로나 원격 URL (원격은 next.config.js에 domain 허용 필요) */
  src: string | StaticImageData;
  alt?: string;
};

type Props = {
  title: string;
  content: string;
  /** 이미지가 없거나 빈 배열이면 자동으로 텍스트만 렌더링 */
  images?: GalleryImage[];
  /** 컴포넌트 바깥 여백/배경 등을 커스터마이즈하고 싶을 때 */
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
      {/* 타이틀: H2 (global.css에서 h2 유틸이 태그에 자동 적용) */}
      <h2 className="text-[var(--black)]">{title}</h2>

      {/* 이미지가 있을 때만 가로 스크롤 갤러리 */}
      {hasImages && (
        <div
          className={clsx(
            // 컨테이너를 좌우로 살짝 꽉 차 보이게(-mx) 하고 패딩으로 균형
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
                'h-[12.0rem] w-[18.0rem]', // 120px x 180px (가로 스크롤용 카드)
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

      {/* 본문: body2 유틸리티 사용 */}
      <p className="body2 text-[var(--black)] mb-[2rem]">{content}</p>
      <div className="flex items-center">
        {/* 첫 번째 아이콘 + 숫자 */}
        <div className="flex items-center gap-[0.4rem]">
          <SvgBox
            Icon={Bookmark}
            size={16}
            viewBox="0 0 16 16"
          />
          <p className="body3 text-[var(--gray2)]">{ctn_bookmark}</p>
        </div>

        {/* 두 번째 아이콘 + 숫자 (앞에 0.8rem 간격) */}
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
