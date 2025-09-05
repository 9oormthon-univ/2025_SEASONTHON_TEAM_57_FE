'use client';

import { useState } from 'react';

import CategoryChips from '@/components/categoryChips';
import { MoreLink } from '@/components/more';
import ShadowBox from '@/components/shadow';

import DateCalendar from './_components/calendar';
import HotChallengeCard from './_components/hotChallengeCard';

export default function ChallengePage() {
  const [category, setCategory] = useState<number>(0);

  return (
    <>
      <DateCalendar />

      {/* main contents area */}
      <div className="flex flex-col mt-[2rem]">
        <Section>
          <h3 className="flex items-center justify-between">
            <span>지금 Hot한 챌린지</span>
            <MoreLink href="#" />
          </h3>
          <div className="flex gap-[1.2rem] mt-[1.2rem] overflow-x-scroll scrollbar-hidden">
            <HotChallengeCard />
            <HotChallengeCard />
            <HotChallengeCard />
            <HotChallengeCard />
          </div>
        </Section>

        <Section>
          <h3 className="flex items-center">
            <span>카테고리</span>
          </h3>
          <CategoryChips
            className="mt-[1.2rem]"
            activeIndex={category}
            onSelect={setCategory}
          />
        </Section>

        <Section>
          <h3 className="flex items-center justify-between">
            <span>OO님이 진행중인 챌린지</span>
            <MoreLink href="#" />
          </h3>
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
