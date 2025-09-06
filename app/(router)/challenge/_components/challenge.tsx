import Image from 'next/image';

import { challengeType } from '@/service/interfaces/challenge';

export default function ChallengeCard({ value }: { value: challengeType }) {
  const { challengeCategories, title, content, image } = value;

  return (
    <div className="py-[1.2rem]">
      <div className="flex gap-[1.2rem] items-center">
        <Image
          src={image}
          alt={title}
          width={60}
          height={60}
          className="rounded-[1.2rem]"
        />
        <div>
          <p className="body1">{title}</p>
          <span className="body3 mt-[.6rem] line-clamp-2">{content}</span>
        </div>
      </div>
      <div className="mt-[.8rem]">{challengeCategories}</div>
    </div>
  );
}
