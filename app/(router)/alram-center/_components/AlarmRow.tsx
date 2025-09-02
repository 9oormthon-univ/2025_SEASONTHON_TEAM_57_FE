'use client';

import React from 'react';

import { ICON_MAP } from './iconMap';
import SvgBox from './SvgBox';
import type { AlarmItem } from './types';

export default function AlarmRow({ item }: { item: AlarmItem }) {
  const Icon = ICON_MAP[item.type];
  // TODO: createdAt → 상대시간 계산 로직 연결 예정
  const relative = '2일 전';

  return (
    <div
      className="flex items-center gap-3 py-[20px] border-b"
      style={{ borderColor: 'var(--gray1)' }}
    >
      <SvgBox Icon={Icon} size={40} className="mr-2" viewBox="0 0 40 40" />

      <div className="flex flex-col">
        <p className="body2">{item.message}</p>
        <span className="body2 text-[var(--gray3)]">{relative}</span>
      </div>
    </div>
  );
}
