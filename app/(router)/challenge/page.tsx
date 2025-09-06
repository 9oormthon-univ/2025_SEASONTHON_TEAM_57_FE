'use client';

import { useEffect, useState } from 'react';

import CategoryChips from '@/components/category/categoryChips';
import { MoreLink } from '@/components/more';
import PostButton from '@/components/postButton';

import { challengeType } from '@/service/interfaces/challenge';

import DateCalendar from './_components/calendar';
import ChallengeCard from './_components/challenge';

export default function ChallengePage() {
  const [category, setCategory] = useState<number>(0);
  const [participating, setParticipating] = useState<challengeType[]>([]);
  const [challenges, setChallenges] = useState<challengeType[]>([]);

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
        setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, [category]);

  return (
    <>
      <DateCalendar />

      {/* main contents area */}
      <div className="flex flex-col mt-[2rem]">
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
            {challenges.length > 0 &&
              challenges.map((challenge, i) => (
                <ChallengeCard
                  key={i}
                  value={challenge}
                />
              ))}
          </div>
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
