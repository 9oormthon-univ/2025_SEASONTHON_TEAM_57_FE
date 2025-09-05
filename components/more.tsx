import Link from 'next/link';

import RightArrow from '@icons/arrow/right_custom.svg';

export const MoreLink = ({ href }: { href: string }) => (
  <Link
    href={href}
    className="text-[var(--gray3)] text-[12px] flex items-center gap-1"
  >
    더보기
    <RightArrow
      width={12}
      height={12}
      stroke="var(--gray3)"
    />
  </Link>
);
