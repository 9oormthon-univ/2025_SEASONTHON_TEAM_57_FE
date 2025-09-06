export interface CertificatingType {
  challengeId: number;
  title: string;
  images: string[];
  createDate: string;
}

export interface Certificating {
  method: 'POST';
  endpoint: '/challenge-posts';
  req: undefined;
  res: {
    challengeId: number;
    images: string[];
  };
}

export interface GetCertificating {
  method: 'GET';
  endpoint: `/challenge-posts/${number}`;
  req: undefined;
  res: CertificatingType;
}

export interface GetMemberCertificating {
  method: 'GET';
  endpoint: `/challenge-posts/${number}/posts/${number}`;
  req: undefined;
  res: CertificatingType[];
}

export interface GetMyCertificatingByDate {
  method: 'GET';
  endpoint: `/challenge-posts/my?year=${number}&month=${number}`;
  req: undefined;
  res: CertificatingType[];
}

export interface GetMyCertificatingByChallenge {
  method: 'GET';
  endpoint: `/challenge-posts/my/${number}`;
  req: undefined;
  res: CertificatingType[];
}
