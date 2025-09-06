import Link from 'next/link';

import SvgBox from './SvgBox';

type ItemProps = {
  href?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
};

export default function ListItem({ href = '#', Icon, label }: ItemProps) {
  return (
    <li className="border-b border-[var(--gray1)] last:border-b-0">
      <Link
        href={href}
        className="grid grid-cols-[auto_1fr_auto] items-center gap-3 h-[60px] px-2 active:opacity-90 hover:bg-white/40"
      >
        <SvgBox
          Icon={Icon}
          size={24}
        />
        <span className={`body2 leading-[24px]`}>{label}</span>

        <span
          aria-hidden
          className="flex items-center justify-center h-6 w-6"
        >
          <i className="block border-t-[2px] border-r-[2px] border-[var(--gray3)] h-3 w-3 rotate-45" />
        </span>
      </Link>
    </li>
  );
}
