'use client';

import Link from 'next/link';
import React from 'react';

export type Post = {
  id: number;
  title: string;
  summary: string;
  meta: string;
};

export default function PostList({ posts, className = '' }: { posts: Post[]; className?: string }) {
  return (
    <ul className={`px-[32px] divide-y divide-[var(--gray1)] ${className}`}>
      {posts.map(p => (
        <li key={p.id} className="py-4">
          <Link href={`/skill/${p.id}`} className="grid grid-cols-[56px_1fr] gap-3">
            <div className="h-24 w-24 rounded-[12px] bg-[var(--gray1)]" />
            <div className="min-w-0">
              <p className="body1 text-[var(--black)] truncate ml-4">{p.title}</p>
              <p className="body3 text-[var(--gray4)] mt-1 line-clamp-2 ml-4">{p.summary}</p>
              <p className="mt-2 text-right text-[var(--gray3)] text-[1.2rem] leading-[150%]">
                {p.meta}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
