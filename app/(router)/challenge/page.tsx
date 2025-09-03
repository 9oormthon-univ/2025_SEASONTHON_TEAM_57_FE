import BottomButton from '@/components/button/bottomButton';
import ShadowBox from '@/components/shadow';

import DateCalendar from './_components/calendar';
import HotChallengeCard from './_components/hotChallengeCard';

export default function ChallengePage() {
  return (
    <>
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
    </>
  );
}

function Section({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="my-[2rem]">{children}</section>;
}
