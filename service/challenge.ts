'use server';

import { api } from './api';
import { challengeType, postChallengeType } from './interfaces';

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

export const PostChallenge = async (params: postChallengeType) => {
  try {
    const res = await api<'postChallenge'>(
      'POST',
      '/challenges',
      {
        title: params.title,
        content: params.content,
        image: params.image,
        startDate: params.startDate,
        endDate: params.endDate,
        categoryIds: params.categoryIds,
      },
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

export const GetMyCertificatingByDate = async (params: { year: number; month: number }) => {
  try {
    const res = await api<'getMyCertificatingByDate'>(
      'GET',
      `/challenge-posts/my?year=${params.year}&month=${params.month}`,
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
