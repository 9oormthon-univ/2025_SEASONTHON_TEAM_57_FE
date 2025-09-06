'use client';

import React, { useEffect, useState } from 'react';

import AlarmRow from './AlarmRow';
import type { AlarmItem } from './types.ts';

export default function AlarmList() {
  const [items, setItems] = useState<AlarmItem[]>([]);

  useEffect(() => {
    setItems([
      {
        id: '1',
        type: 'challenge',
        message: 'ㅇㅇ님이 댓글을 남기셨어요.',
        createdAt: '2025-08-30T09:00:00+09:00',
      },
      {
        id: '2',
        type: 'talent',
        message: 'ㅇㅇ님이 댓글을 남기셨어요.',
        createdAt: '2025-08-30T09:00:00+09:00',
      },
      {
        id: '3',
        type: 'message',
        message: 'ㅇㅇ님이 댓글을 남기셨어요.',
        createdAt: '2025-08-30T09:00:00+09:00',
      },
      {
        id: '4',
        type: 'challenge',
        message: 'ㅇㅇ님이 댓글을 남기셨어요.',
        createdAt: '2025-08-30T09:00:00+09:00',
      },
      {
        id: '5',
        type: 'talent',
        message: 'ㅇㅇ님이 댓글을 남기셨어요.',
        createdAt: '2025-08-30T09:00:00+09:00',
      },
      {
        id: '6',
        type: 'message',
        message: 'ㅇㅇ님이 댓글을 남기셨어요.',
        createdAt: '2025-08-30T09:00:00+09:00',
      },
    ]);
  }, []);

  return (
    <ul className="px-[32px] pb-8">
      {items.map(item => (
        <li key={item.id}>
          <AlarmRow item={item} />
        </li>
      ))}
    </ul>
  );
}
