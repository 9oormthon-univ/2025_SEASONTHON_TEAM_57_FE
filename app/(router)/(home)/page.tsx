import React from 'react';

import { MoreLink } from '@/components/more';

import Wrapper32 from '@/components/wrapper32';

import HotChallengeCard from './_components/hotChallengeCard';

export default function Home() {
  return (
    <>
      <section className="mt-[2rem]">
        <Wrapper32>
          <h2 className="flex items-center justify-between">
            <span>최근에 등록된 재능</span>
            <MoreLink href="/skill" />
          </h2>
        </Wrapper32>
        <SectionWrapper>
          <HotChallengeCard />
        </SectionWrapper>
      </section>

      <section className="mt-[3.2rem]">
        <Wrapper32>
          <h3 className="flex items-center justify-between">
            <span>지금 Hot한 챌린지</span>
            <MoreLink href="/challenge" />
          </h3>
        </Wrapper32>
        <SectionWrapper>
          <HotChallengeCard clamp={1} />
        </SectionWrapper>
      </section>

      <section className="mt-[3.2rem]">
        <Wrapper32>
          <h3 className="flex items-center justify-between">
            <span>지금 Hot한 재능 공유</span>
            <MoreLink href="/skill" />
          </h3>
        </Wrapper32>
        <SectionWrapper>
          <HotChallengeCard clamp={1} />
        </SectionWrapper>
      </section>
    </>
  );
}

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative overflow-x-scroll w-full h-full overflow-y-visible scrollbar-hidden py-[1.2rem] px-[3.2rem]">
      <div className="flex gap-[1.2rem]">{children}</div>
    </div>
  );
};
