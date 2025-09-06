import clsx from 'clsx';

import ShadowBox from '@/components/shadow';

export default function HotChallengeCard({
  clamp,
  endSoon,
}: {
  clamp?: number;
  endSoon?: boolean;
}) {
  return (
    <ShadowBox
      className={clsx(
        'grid',
        clamp ? ' grid-rows-[12rem_6rem] min-w-[20rem]' : 'grid-rows-[16rem_8rem] min-w-[24rem]'
      )}
    >
      <div className="inner-shadow bg-[#99FF95] rounded-[1.6rem] p-[1.2rem] border-[.5rem] border-white">
        <div className="flex justify-between text-[1.2rem]">
          <div className="px-[1rem] py-[.4rem] bg-gray4 text-white rounded-[.4rem] text-center leading-[1.4rem]">
            모집중
          </div>
        </div>
      </div>
      <div className="p-[.8rem]">
        <div className="body1 !leading-[140%]">{'웹개발'}</div>
        <div
          className="caption !leading-[150%]"
          style={
            clamp
              ? {
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: clamp,
                  marginTop: '.4rem',
                }
              : {
                  marginTop: '.6rem',
                }
          }
        >
          {'Html, CSS, React를 쉽게 배워봐요!'}
          <br />
          {'기본 개념부터, 협업방법까지 알려드립니다!'}
        </div>
      </div>
    </ShadowBox>
  );
}
