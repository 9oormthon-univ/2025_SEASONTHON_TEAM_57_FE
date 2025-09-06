import { GetMyCertificatingByDate } from '@/service/challenge';

import ChallengeMain from './challengeMain';

export default function ChallengePage() {
  async function getCalendarData(params: { year: number; month: number }) {
    'use server';

    const { year, month } = params;
    try {
      const res = await GetMyCertificatingByDate({ year, month });
      console.log('calendar data', res);
      return res;
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  }
  return (
    <>
      <ChallengeMain action={getCalendarData} />
    </>
  );
}
