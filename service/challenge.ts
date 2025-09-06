'use server';

import { api } from './api';

export const GetApprovedAllChallenges = async () => {
  try {
    const res = await api<'getApprovedAllChallenges'>(
      'GET',
      '/challenges/approve-list/all',
      undefined,
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetApprovedChallenges = async ({ categoryId }: { categoryId: number }) => {
  try {
    const res = await api<'getApprovedChallenges'>(
      'GET',
      `/challenges/approve-list?categoryId=${categoryId}`,
      undefined,
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetParticipatingChallenges = async () => {
  try {
    const res = await api<'getParticipatingChallenges'>(
      'GET',
      '/challenges/my-challenge-posts',
      undefined,
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};
