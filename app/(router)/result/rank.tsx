// components/ranking/RankingList.tsx
'use client';

import clsx from 'clsx';
import React from 'react';

type Participant = {
  id: string;
  name: string;
  voteCount: number;
  avatarUrl?: string;
};

type RankItem = {
  participant: Participant;
  rank: number; // 1부터 시작
};

type RankingStrategy = 'competition' | 'dense';
// competition: 1,2,2,4 (공동 등수 다음은 점프)
// dense:       1,2,2,3 (공동 등수 다음은 +1)

type Props = {
  participants: Participant[];
  sort?: 'desc' | 'asc'; // 기본 desc(내림차순)
  strategy?: RankingStrategy; // 기본 competition
  meId?: string; // 내 항목 하이라이트
  className?: string;
  showSeparator?: boolean; // 항목 사이 구분선
};

const nf = new Intl.NumberFormat('ko-KR');

function computeRanks(
  items: Participant[],
  sort: 'desc' | 'asc',
  strategy: RankingStrategy
): RankItem[] {
  const sorted = [...items].sort((a, b) =>
    sort === 'desc' ? b.voteCount - a.voteCount : a.voteCount - b.voteCount
  );

  const out: RankItem[] = [];
  let currentRank = 0;
  let lastVotes: number | null = null;

  if (strategy === 'competition') {
    // 1,2,2,4
    for (let i = 0; i < sorted.length; i++) {
      const v = sorted[i].voteCount;
      if (i === 0) {
        currentRank = 1;
        lastVotes = v;
      } else if (v === lastVotes) {
        // 같은 점수면 동일 등수
      } else {
        // i번째의 등수는 "앞에 있는 사람 수 + 1"
        currentRank = i + 1;
        lastVotes = v;
      }
      out.push({ participant: sorted[i], rank: currentRank });
    }
  } else {
    // dense: 1,2,2,3
    for (let i = 0; i < sorted.length; i++) {
      const v = sorted[i].voteCount;
      if (i === 0) {
        currentRank = 1;
        lastVotes = v;
      } else if (v === lastVotes) {
        // 등수 유지
      } else {
        currentRank += 1;
        lastVotes = v;
      }
      out.push({ participant: sorted[i], rank: currentRank });
    }
  }

  return out;
}

export default function RankingList({
  participants,
  sort = 'desc',
  strategy = 'competition',
  meId,
  className,
  showSeparator = true,
}: Props) {
  const ranked = React.useMemo(
    () => computeRanks(participants, sort, strategy),
    [participants, sort, strategy]
  );

  return (
    <ul className={clsx('rounded-2xl bg-white', className)}>
      {ranked.map(({ participant, rank }, idx) => {
        const isMe = meId ? participant.id === meId : false;
        return (
          <li
            key={participant.id}
            className={clsx(
              'flex items-center justify-between px-4 py-8',
              showSeparator && idx !== ranked.length - 1 && 'border-b border-gray-200',
              isMe && 'bg-blue-50'
            )}
            aria-label={`${rank}위 ${participant.name} 투표수 ${participant.voteCount}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* 순위 뱃지 */}
              <div
                className={clsx(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                  'bg-gray-200 text-gray-700',
                  ' font-semibold'
                )}
                aria-hidden
              >
                {rank}
              </div>

              {/* 이름 */}
              <div className="min-w-0">
                <p className={clsx(' font-medium text-black truncate', isMe && 'text-blue-700')}>
                  {participant.name}
                </p>
              </div>
            </div>

            {/* 투표수 */}
            <div className="ml-3 shrink-0 text-black">
              투표수 {nf.format(participant.voteCount)}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
