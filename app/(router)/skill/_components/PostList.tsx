'use client';
import Link from 'next/link';
import React from 'react';

import { SkillType } from '@/constants/types/index';

export type Post = {
  id: number;
  title: string;
  content: string;
  price: number;
  type: SkillType;
  categoryId: string;
};

export default function PostList({ posts, className = '' }: { posts: Post[]; className?: string }) {
  const TYPE_MAP: Record<SkillType, string> = {
    learn: '배우기',
    teach: '알려주기',
    trade: '교환',
  };
  return (
    <ul className={`divide-y divide-[var(--gray1)] ${className}`}>
      {posts.map(p => (
        <li
          key={p.id}
          className="py-4"
        >
          <Link
            href={`/skill/${p.id}`}
            className="grid grid-cols-[56px_1fr] gap-3"
          >
            <div className="h-24 w-24 rounded-[12px] bg-[var(--gray1)]" />
            <div className="min-w-0">
              <p className="body1 text-[var(--black)] truncate ml-4">
                [{TYPE_MAP[p.type]}] {p.title}
              </p>
              <p className="body3 text-[var(--gray4)] mt-1 line-clamp-2 ml-4">{p.content}</p>
              <p className="body1 text-[var(--black)] pl-[1.2rem] mt-[0.6rem]">{p.price}원</p>
              <p className="mt-2 text-right text-[var(--gray3)] text-[1.2rem] leading-[150%]">
                {p.categoryId}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
