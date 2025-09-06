import { GetMyCertificatingByDate } from '@/service/challenge';

import { getCookie } from '@/utils/cookie';

import ChallengeMain from './challengeMain';

export default function ChallengePage() {
  async function getCalendarData(params: { year: number; month: number }) {
    'use server';

    const { year, month } = params;
    try {
      const access_token = await getCookie('accessToken');
      // if (access_token === 'guest') {
      //   return;
      // }
      if (access_token) {
        console.log('No access token available');
        return;
      }
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
