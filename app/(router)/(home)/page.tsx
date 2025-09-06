import React from 'react';

import { MoreLink } from '@/components/more';

import HotChallengeCard from './_components/hotChallengeCard';

export default function Home() {
  return (
    <>
      <section className="mt-[2rem]">
        <h2 className="flex items-center justify-between">
          <span>최근에 등록된 재능</span>
          <MoreLink href="/skill" />
        </h2>
        <div className="overflow-x-scroll overflow-y-visible scrollbar-hidden py-[1.2rem]">
          <div className="flex gap-[1.2rem]">
            <HotChallengeCard />
            <HotChallengeCard />
            <HotChallengeCard />
            <HotChallengeCard />
          </div>
        </div>
      </section>
      <section className="mt-[3.2rem]">
        <h3 className="flex items-center justify-between">
          <span>지금 Hot한 챌린지</span>
          <MoreLink href="/challenge" />
        </h3>
        <div className="overflow-x-scroll overflow-y-visible scrollbar-hidden py-[1.2rem]">
          <div className="flex gap-[1.2rem]">
            <HotChallengeCard clamp={1} />
          </div>
        </div>
      </section>
      <section className="mt-[3.2rem]">
        <h3 className="flex items-center justify-between">
          <span>지금 Hot한 재능 공유</span>
          <MoreLink href="/skill" />
        </h3>
        <div className="overflow-x-scroll overflow-y-visible scrollbar-hidden py-[1.2rem]">
          <div className="flex gap-[1.2rem]">
            <HotChallengeCard clamp={1} />
          </div>
        </div>
      </section>
    </>
  );
}
