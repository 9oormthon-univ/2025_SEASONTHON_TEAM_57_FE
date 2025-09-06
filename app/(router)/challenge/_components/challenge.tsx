import Image from 'next/image';

import Link from 'next/link';

import { challengeType } from '@/service/interfaces/challenge';
export default function ChallengeCard({ value }: { value: challengeType }) {
  const { challengeCategories, title, content, image } = value;

  return (
    <Link
      href={'/challenge/1'}
      className="py-[1.2rem] border-b border-[var(--gray2)]"
    >
      <div className="flex gap-[1.2rem] items-center">
        <Image
          src={image}
          alt={'asdf'}
          width={60}
          height={60}
          className="rounded-[1.2rem]"
        />
        <div>
          <p className="body1">{title}</p>
          <span className="body3 mt-[.6rem] line-clamp-2">{content}</span>
        </div>
      </div>
      <div className="mt-[.8rem] text-right text-gray3">{challengeCategories.join(' / ')}</div>
    </Link>
  );
}
