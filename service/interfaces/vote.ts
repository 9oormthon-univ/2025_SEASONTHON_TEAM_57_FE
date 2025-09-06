export interface VoteForChallenge {
  method: 'POST';
  endpoint: `/challenge-posts/${number}/vote/${number}`;
  req: {
    challengeId: number;
    participantId: number;
  };
  res: undefined;
}

export interface VoteResultType {
  participantId: number;
  participantNickname: string;
  participantProfile: string;
  voteCount: number;
  rank: number;
}
export interface GetVoteResult {
  method: 'GET';
  endpoint: `/challenge-posts/${number}/votes`;
  req: undefined;
  res: VoteResultType[];
}

export interface GetParticipatingMember {
  method: 'GET';
  endpoint: `/challenge-posts/${number}/participants`;
  req: undefined;
  res: {
    nickName: string;
  };
}
