import ShadowBox from '@/components/shadow';

export default function HotChallengeCard() {
  return (
    <ShadowBox className="grid grid-rows-[16rem_8rem] min-w-[25rem]">
      <div className="inner-shadow bg-[#99FF95] rounded-[1.6rem] p-[1.2rem] border-[.5rem] border-white">
        <div className="flex justify-between">
          <div className="px-[1rem] py-[.4rem] bg-gray4 text-white rounded-[.4rem] text-center">
            모집중
          </div>
        </div>
      </div>
      <div className="p-[.8rem]">
        <div className="body1 !leading-[140%]">{'웹개발'}</div>
        <div className="caption mt-[.6rem] !leading-[150%]">
          {'Html, CSS, React를 쉽게 배워봐요!'}
          <br />
          {'기본 개념부터, 협업방법까지 알려드립니다!'}
        </div>
      </div>
    </ShadowBox>
  );
}
