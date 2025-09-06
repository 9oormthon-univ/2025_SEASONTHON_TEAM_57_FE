'use client';
import Image from 'next/image';
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

export default function PostList({
  posts,
  className = '',
  imgIndex = 0,
}: {
  posts: Post[];
  className?: string;
  imgIndex?: number;
}) {
  const TYPE_MAP: Record<SkillType, string> = {
    learn: '배우기',
    teach: '알려주기',
    trade: '교환',
  };

  const imgSrc = `/image/${imgIndex + 1}.png`;

  return (
    <ul className={`divide-y divide-[var(--gray1)] ${className}`}>
      {posts.map(p => (
        <li
          key={p.id}
          className="py-4"
        >
          <Link
            href={`/skill/${p.id}`}
            className="grid grid-cols-[60px_1fr] gap-3"
          >
            <div className="w-[60px] h-[60px] rounded-[12px] overflow-hidden bg-[var(--gray1)]">
              <Image
                src={imgSrc}
                alt={`post-image-${imgIndex + 1}`}
                width={60}
                height={60}
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="body1 text-[var(--black)] truncate ml-4">
                [{TYPE_MAP[p.type]}] {p.title}
              </p>
              <p className="body3 text-[var(--gray4)] mt-1 line-clamp-2 ml-4 mb-[1.6rem]">
                {p.content}
              </p>
              {/* <p className="body1 text-[var(--black)] pl-[1.2rem] mt-[0.6rem]">{p.price}원</p> */}
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
