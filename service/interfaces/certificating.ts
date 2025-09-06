export interface CertificatingType {
  date: string; // "2025-09-06"
  totalCont: number; // 1073741824
  items: {
    author: string; // "홍길동"
    title: string; // "영어 7일 챌린지"
    images: string; // "[https://example.com/image1.png,https://example.com/image2.png]"
    createDate: string; // "2025-09-08"
  }[];
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
