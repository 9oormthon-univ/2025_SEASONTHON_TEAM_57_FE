import clsx from 'clsx';
import Link from 'next/link';

import Pencil from '@icons/pencil.svg';

export default function PostButton({ href }: { href: string }) {
  return (
    <div className="fixed flex justify-center bottom-[8rem] inset-x-0 z-[100]">
      <div className="flex w-full justify-end max-w-[50rem] px-[2rem]">
        <Link
          href={href}
          className={clsx(
            'flex items-center justify-center w-[8rem] aspect-square rounded-full bg-whiteGradient',
            'border border-[var(--gray1)]'
          )}
        >
          <Pencil />
        </Link>
      </div>
    </div>
  );
}
