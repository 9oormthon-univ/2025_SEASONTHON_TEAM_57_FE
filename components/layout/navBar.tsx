'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ApertureIcon from '@icons/aperture.svg';
import HomeIcon from '@icons/home.svg';
import LinkIcon from '@icons/link.svg';
import UserIcon from '@icons/user.svg';

const NavItem = [
  { href: '/', SVG: HomeIcon, text: '처음으로' },
  { href: '/skill', SVG: LinkIcon, text: '재능공유' },
  { href: '/challenge', SVG: ApertureIcon, text: '온다챌린지' },
  { href: '/mypage', SVG: UserIcon, text: '마이페이지' },
];

export default function ButtonNavBar() {
  const pathname = usePathname();
  const isActive = (href: string): boolean => pathname === href || pathname.startsWith(href + '/');

  // 현재 디자인상으론 /, /challenge, /mypage, /skill 경로에만 NavBar가 보여서 일단 그렇게 처리함.
  const hiddenPaths = ['/', '/challenge', '/mypage', '/skill'];
  if (!hiddenPaths.includes(pathname)) {
    return null;
  }

  return (
    <nav
      className={
        'fixed bottom-0 w-full h-[6.4rem] max-w-[500px] bg-white flex justify-center items-center'
      }
    >
      <div className="flex justify-around w-full">
        {NavItem.map(item => (
          <NavBarItem
            key={item.href}
            href={item.href}
            SVG={item.SVG}
            text={item.text}
            active={isActive(item.href)}
          />
        ))}
      </div>
    </nav>
  );
}

function NavBarItem({
  href,
  SVG,
  text,
  active = false,
}: Readonly<{
  href: string;
  SVG: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  active: boolean;
}>) {
  return (
    <Link
      href={href}
      className={clsx('flex flex-col items-center', active ? 'text-primary' : 'text-gray2')}
    >
      <SVG stroke={clsx(active ? 'var(--primary)' : 'var(--gray2)')} />
      <span
        className={clsx(
          'text-center body3 font-[600] leading-[1.8rem] mt-[.4rem]',
          active ? 'text-primary' : 'text-gray2'
        )}
      >
        {text}
      </span>
    </Link>
  );
}
