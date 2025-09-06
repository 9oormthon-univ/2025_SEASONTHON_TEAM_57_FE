'use client';

import { useEffect, useState } from 'react';

import CategoryChips from '@/components/category/categoryChips';
import PostButton from '@/components/postButton';

import Wrapper32 from '@/components/wrapper32';
import { CertificatingType } from '@/service/interfaces';
import { challengeType } from '@/service/interfaces/challenge';

import DateCalendar from '../_components/calendar';
import ChallengeCard from '../_components/challenge';

export type Props = {
  action: (param: { year: number; month: number }) => Promise<CertificatingType[] | undefined>;
};

const challenges: challengeType[] = [
  {
    challengeId: 1,
    author: '서니',
    reviewStatus: 'APPROVED',
    progressStatus: 'ONGOING',
    createdAt: '2023-09-01',
    title: '스키 30일 챌린지',
    content:
      '25/26시즌 생활체육지도자 2급 스키 같은 지도자 준비중이거나 스키 레벨/티칭1 준비중인 사람도 환영합니다.같이 챌린지를 하면서 자격증 함께 취득해봐요',
    image: '/skiexample.png',
    challengeCategories: ['스포츠', '웰빙'],
    startDate: '2023-10-01',
    endDate: '2023-10-30',
  },
  {
    challengeId: 2,
    author: '도비',
    reviewStatus: 'APPROVED',
    progressStatus: 'ONGOING',
    createdAt: '2023-09-01',
    title: 'UX/UI 디자인',
    content: 'Figma로 와이어프레임/프로토타입 제작부터 사용자 경험 개선까지!',
    image: '/image/3.png',
    challengeCategories: ['IT', '디자인'],
    startDate: '2023-10-01',
    endDate: '2023-10-30',
  },
  {
    challengeId: 3,
    author: '도라에몽',
    reviewStatus: 'APPROVED',
    progressStatus: 'ONGOING',
    createdAt: '2023-09-01',
    title: '하루 30분 영어회화',
    content: '매일 30분씩 영어로 대화하며 실전 감각 키우기!',
    image: '/image/5.png',
    challengeCategories: ['외국어', '어학'],
    startDate: '2023-10-01',
    endDate: '2023-10-30',
  },
];

export default function ChallengeMain({ action }: Props) {
  const [category, setCategory] = useState<number>(0);
  const [participating, setParticipating] = useState<challengeType[]>([]);
  // const [challenges, setChallenges] = useState<challengeType[]>([]);

  useEffect(() => {
    const fetchParticipatingChallenges = async () => {
      try {
        const response = await fetch(`/api/challenge/participating`);
        if (!response.ok) {
          throw new Error('Failed to fetch participating challenges');
        }
        const data = (await response.json()) as challengeType[];
        console.log('참여중', data);
        setParticipating(data);
      } catch (error) {
        console.error('Error fetching participating challenges:', error);
      }
    };
    fetchParticipatingChallenges();
  }, []);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch(`/api/challenge/getCategory?categoryId=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch challenges');
        }
        const data = (await response.json()) as challengeType[];
        console.log('챌린지', data);
        // setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, [category]);

  return (
    <>
      <Wrapper32>
        <DateCalendar action={action} />
      </Wrapper32>

      <div className="flex flex-col mt-[2rem]">
        <Section>
          <Wrapper32>
            <h3 className="flex items-center">
              <span>카테고리</span>
            </h3>
          </Wrapper32>
          <CategoryChips
            className="mt-[1.2rem]"
            activeIndex={category}
            onSelect={setCategory}
          />
        </Section>

        <Section>
          <Wrapper32>
            <h3 className="flex items-center justify-between">
              <span>OO님이 진행중인 챌린지</span>
            </h3>
            <div className="mt-[1.2rem]">
              {challenges.length > 0 &&
                challenges.map((challenge, i) => (
                  <ChallengeCard
                    key={i}
                    value={challenge}
                  />
                ))}
            </div>
          </Wrapper32>
        </Section>
      </div>

      {participating.length !== 0 && <PostButton href="/challenge/post" />}
    </>
  );
}

function Section({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="py-[2rem]">{children}</section>;
}
