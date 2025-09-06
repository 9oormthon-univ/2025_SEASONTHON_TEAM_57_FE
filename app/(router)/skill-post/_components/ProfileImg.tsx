'use client';

import Image from 'next/image';

type Props = {
  src: string;
  name: string;
  time: string;
};

export default function ProfileImg({ src, name, time }: Props) {
  return (
    <div className="flex items-center h-[6.0rem]">
      <div className="w-[6.0rem] h-[6.0rem] rounded-full overflow-hidden">
        <Image
          src={src}
          alt="profile"
          width={60}
          height={60}
          className="object-cover"
        />
      </div>

      <div className="flex flex-col ml-[0.8rem]">
        <span className="body1">{name}</span>
        <span className="body3 mt-[0.6rem]">{time}</span>
      </div>
    </div>
  );
}
