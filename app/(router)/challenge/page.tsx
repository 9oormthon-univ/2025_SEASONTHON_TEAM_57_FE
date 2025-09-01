import Bookmark from '@icons/bookmark.svg';

import DateCalendar from '@/components/calendar/calendar';
import Wrapper from '@/components/layout/body';
import ShadowBox from '@/components/layout/shadow';

export default function ChallengePage() {
  return (
    <Wrapper>
      <DateCalendar />

      {/* main contents area */}
      <div className="flex flex-col">
        <Section>
          <h2>지금 Hot한 챌린지</h2>
          <div className="flex gap-[1.2rem] mt-[1.2rem] overflow-x-scroll scrollbar-hidden">
            <HotChallengeCard />
            <HotChallengeCard />
            <HotChallengeCard />
            <HotChallengeCard />
          </div>
        </Section>
        <Section>
          <h3>OO님이 진행중인 챌린지</h3>
          <div className="mt-[1.2rem]">
            <ShadowBox className="p-[1.2rem] min-h-[10rem]">
              <div className="body1">{'웹개발'}</div>
              <div className="body3 mt-[.4rem]">{'example'}</div>
            </ShadowBox>
          </div>
        </Section>
      </div>
    </Wrapper>
  );
}

// 나중에 다른폴더로 컴포넌트 분리할 예정
function Section({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="my-[2rem]">{children}</section>;
}

function HotChallengeCard() {
  return (
    <ShadowBox className="grid grid-rows-[16rem_8rem] min-w-[25rem]">
      <div className="inner-shadow bg-[#99FF95] rounded-t-[1.6rem] p-[1.2rem]">
        <div className="flex justify-between">
          <div className="px-[1rem] py-[.4rem] bg-gray4 text-white rounded-[.4rem] text-center">
            모집중
          </div>
          <Bookmark />
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
