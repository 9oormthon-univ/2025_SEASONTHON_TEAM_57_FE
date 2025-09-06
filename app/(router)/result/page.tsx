import RankingList from './rank';

export default function ResultPage() {
  const data = [
    { id: 'u1', name: '에디', voteCount: 33 },
    { id: 'u2', name: '사랑이', voteCount: 53 },
    { id: 'u3', name: '온심', voteCount: 43 },
    { id: 'u4', name: '제임스', voteCount: 22 },
    { id: 'u5', name: '온다온다', voteCount: 20 },
  ];

  return (
    <>
      <h1>투표 결과</h1>
      <h3 className="text-gray4">30일 포폴사이트 개발 챌린지</h3>
      <div className="flex items-end justify-between mt-[3.2rem] gap-[2rem]">
        <div className="w-[8rem] aspect-square rounded-full bg-gray-200"></div>
        <div className="w-[10rem] aspect-square rounded-full bg-gray-200"></div>
        <div className="w-[8rem] aspect-square rounded-full bg-gray-200"></div>
      </div>
      <div className="h-[30rem] mt-[3.2rem] body3">
        <RankingList
          participants={data}
          strategy="competition" // 또는 'dense'
          sort="desc"
        />
      </div>
    </>
  );
}

const Member = (
  { score, name, rank }: { score?: number; name?: string; rank?: number } = {
    score: 0,
    name: '서니',
    rank: 1,
  }
) => {
  return (
    <>
      <div>
        <div>
          <div className="w-[2.4rem] aspect-square flex items-center justify-center">{rank}</div>
          <div>{name}</div>
        </div>
        <div>{score}</div>
      </div>
    </>
  );
};
