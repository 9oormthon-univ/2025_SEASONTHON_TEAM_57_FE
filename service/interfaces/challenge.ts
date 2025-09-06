import { ProgressStatus, ReviewStatus } from '@/constants/types';

export interface challengeType {
  challengeId: number;
  author: string;
  title: string;
  content: string;
  image: string;
  reviewStatus: ReviewStatus;
  progressStatus: ProgressStatus;
  startDate: string;
  endDate: string;
  createdAt: string;
  challengeCategories: string[];
}

export interface postChallengeType {
  title: string;
  content: string;
  // image: string[];
  startDate: string;
  endDate: string;
  categoryIds: number[];
}

export interface PostChallenge {
  method: 'POST';
  endpoint: '/challenges';
  req: postChallengeType;
  res: undefined;
}

export interface RejectPostChallenge {
  method: 'POST';
  endpoint: `/challenges/${number}/review/reject`;
  req: {
    challengeId: number;
  };
  res: undefined;
}

export interface PendingPostChallenge {
  method: 'POST';
  endpoint: `/challenges/${number}/review/pending`;
  req: {
    challengeId: number;
  };
  res: undefined;
}

export interface ApprovePostChallenge {
  method: 'POST';
  endpoint: `/challenges/${number}/review/approve`;
  req: {
    challengeId: number;
  };
  res: undefined;
}

export interface GetChallengeDetail {
  method: 'GET';
  endpoint: `/challenges/${number}`;
  req: {
    challengeId: number;
  };
  res: challengeType;
}

export interface GetChallenges {
  method: 'GET';
  endpoint: '/challenges/review';
  req: {
    reviewStatus: ReviewStatus;
  };
  res: challengeType[];
}

export interface GetMyChallenges {
  method: 'GET';
  endpoint: '/challenges/my-list';
  req: undefined;
  res: challengeType[];
}

export interface GetApprovedChallenges {
  method: 'GET';
  endpoint: `/challenges/approve-list?categoryId=${number}`;
  req: {
    categoryId: number;
  };
  res: challengeType[];
}
export interface GetApprovedAllChallenges {
  method: 'GET';
  endpoint: '/challenges/approve-list/all';
  req: undefined;
  res: challengeType[];
}

export interface GetPopularChallenges {
  method: 'GET';
  endpoint: '/challenges/popular';
  req: undefined;
  res: challengeType[];
}

export interface GetParticipatingChallenges {
  method: 'GET';
  endpoint: '/challenges/my-challenge-posts';
  req: undefined;
  res: challengeType[];
}
