import React from 'react';

import { MoreLink } from '@/components/more';
import Wrapper32 from '@/components/wrapper32';

import HotChallengeCard from './_components/hotChallengeCard';

export default function Home() {
  // 🔥 목업 9개 (이미지는 /public/image/1.png ~ 9.png)
  const mockCards = [
    {
      id: 1,
      title: '알고리즘 스터디',
      description: '자료구조/알고리즘 핵심 정리\n주 2회 문제풀이 스터디',
      imageSrc: '/image/1.png',
      status: '모집중',
      endSoon: true,
    },
    {
      id: 2,
      title: '영어 회화',
      description: '원어민 발음 교정부터\n일상 회화 자신감 업!',
      imageSrc: '/image/3.png',
      status: '모집중',
      endSoon: false,
    },
    {
      id: 3,
      title: '데이터 분석',
      description: '파이썬/판다스로 데이터 다루기\n시각화와 간단한 모델링까지!',
      imageSrc: '/image/4.png',
      status: '모집중',
      endSoon: true,
    },
    {
      id: 4,
      title: '스키 30일 챌린지',
      description: '25/26시즌 생활체육지도자 2급 스키',
      imageSrc: '/image/2.png',
      status: '모집중',
      endSoon: false,
    },
    {
      id: 5,
      title: 'UI/UX 디자인',
      description: 'Figma로 와이어프레임/프로토타입\n실전 케이스 기반 실습',
      imageSrc: '/image/6.png',
      status: '모집중',
      endSoon: false,
    },
    {
      id: 6,
      title: '면접 코칭',
      description: '이력서/포트폴리오 리뷰\n기술면접 모의 진행',
      imageSrc: '/image/5.png',
      status: '모집중',
      endSoon: false,
    },
    {
      id: 7,
      title: '포토샵/일러스트',
      description: '썸네일/배너 실전 작업\n툴 단축키부터 실무 팁',
      imageSrc: '/image/7.png',
      status: '모집중',
      endSoon: false,
    },
    {
      id: 8,
      title: '스피치/발표',
      description: '발표 구조화, 시선처리, 보이스 트레이닝\nPT 자신감 키우기',
      imageSrc: '/image/8.png',
      status: '모집중',
      endSoon: true,
    },
    {
      id: 9,
      title: 'OPIC 준비',
      description: 'IH 목표반 운영\n스크립트 없이 말하는 연습',
      imageSrc: '/image/9.png',
      status: '모집중',
      endSoon: false,
    },
  ];

  return (
    <>
      {/* 섹션 1: 최근 재능 (clamp=2 기본) */}
      <section className="mt-[2rem]">
        <Wrapper32>
          <h2 className="flex items-center justify-between">
            <span>최근에 등록된 재능</span>
            <MoreLink href="/skill" />
          </h2>
        </Wrapper32>
        <SectionWrapper>
          {mockCards.slice(0, 3).map(c => (
            <HotChallengeCard
              key={c.id}
              title={c.title}
              description={c.description}
              imageSrc={c.imageSrc}
              status={c.status}
              endSoon={c.endSoon}
              clamp={2}
            />
          ))}
        </SectionWrapper>
      </section>

      {/* 섹션 2: HOT 챌린지 (clamp=1) */}
      <section className="mt-[3.2rem]">
        <Wrapper32>
          <h3 className="flex items-center justify-between">
            <span>지금 Hot한 챌린지</span>
            <MoreLink href="/challenge" />
          </h3>
        </Wrapper32>
        <SectionWrapper>
          {mockCards.slice(3, 6).map(c => (
            <HotChallengeCard
              key={c.id}
              title={c.title}
              description={c.description}
              imageSrc={c.imageSrc}
              status={c.status}
              endSoon={c.endSoon}
              clamp={1}
            />
          ))}
        </SectionWrapper>
      </section>

      {/* 섹션 3: HOT 재능 공유 (clamp=1) */}
      <section className="mt-[3.2rem]">
        <Wrapper32>
          <h3 className="flex items-center justify-between">
            <span>지금 Hot한 재능 공유</span>
            <MoreLink href="/skill" />
          </h3>
        </Wrapper32>
        <SectionWrapper>
          {mockCards.slice(6, 9).map(c => (
            <HotChallengeCard
              key={c.id}
              title={c.title}
              description={c.description}
              imageSrc={c.imageSrc}
              status={c.status}
              endSoon={c.endSoon}
              clamp={1}
            />
          ))}
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
