import clsx from 'clsx';
import Image from 'next/image';

import ShadowBox from '@/components/shadow';

export default function HotChallengeCard({
  clamp = 2,
  endSoon,
  title = '웹개발',
  description = 'Html, CSS, React를 쉽게 배워봐요!\n기본 개념부터, 협업방법까지 알려드..',
  imageSrc = '/image/1.png',
  status = '모집중',
}: {
  clamp?: number;
  endSoon?: boolean;
  title?: string;
  description?: string;
  imageSrc?: string;
  status?: string;
}) {
  return (
    <ShadowBox
      className={clsx(
        'grid h-fit',
        clamp !== 2
          ? 'grid-rows-[12rem_6rem] min-w-[20rem]'
          : 'grid-rows-[16rem_8rem] min-w-[24rem]'
      )}
    >
      <div className="inner-shadow rounded-[1.6rem] p-[.6rem]">
        <div className="relative w-full h-full rounded-[1.2rem] overflow-hidden border-[.5rem] border-white">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 240px, 320px"
            className="object-cover"
            priority
          />
          <div className="absolute left-[.8rem] top-[.8rem] flex gap-[.6rem] text-[1.2rem]">
            <div className="px-[1rem] py-[.4rem] bg-gray4 text-white rounded-[.4rem] leading-[1.4rem]">
              {status}
            </div>
            {endSoon && (
              <div className="px-[1rem] py-[.4rem] bg-[var(--primary)] text-white rounded-[.4rem] leading-[1.4rem]">
                마감임박
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-[.8rem]">
        <div className="body1 !leading-[140%]">{title}</div>
        <div
          className="caption !leading-[150%]"
          style={
            clamp !== 2
              ? {
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: clamp,
                  marginTop: '.4rem',
                }
              : { marginTop: '.6rem' }
          }
        >
          {description.split('\n').map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </div>
      </div>
    </ShadowBox>
  );
}
