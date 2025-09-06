'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type Action = {
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  title?: string;
};

export interface HeaderProps {
  title?: ReactNode;
  left?: Action;
  right?: Action[];
  className?: string;
}

export default function Header({ title, left, right, className }: HeaderProps) {
  return (
    <header
      className={clsx('w-full bg-main backdrop-blur', 'sticky top-0 z-50', className)}
      role="banner"
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center h-24 px-[3.2rem]">
        {/* Left */}
        <div className="min-w-0 justify-self-start">
          {left ? (
            <ActionButton
              action={left}
              align="left"
            />
          ) : null}
        </div>

        {/* Center */}
        <div className="min-w-0 text-center justify-self-center">
          {title ? (
            <div className="mx-auto max-w-[min(80vw,48rem)] body1 truncate">{title}</div>
          ) : null}
        </div>

        {/* Right */}
        <div className="min-w-0 justify-self-end">
          <div className="flex items-center gap-[2rem]">
            {(right ?? []).slice(0, 2).map((a, i) => (
              <ActionButton
                key={i}
                action={a}
                align="right"
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function ActionButton({ action, align }: { action: Action; align?: 'left' | 'right' }) {
  const common = 'flex items-center justify-center transition';
  const className = clsx(common, align === 'left' ? 'justify-start' : 'justify-end');

  const router = useRouter();

  if (action.title) {
    return <h2>{action.title}</h2>;
  }

  if (action.href && !action.disabled) {
    return (
      <Link
        href={action.href}
        className={className}
      >
        {action.icon}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={align === 'left' ? () => router.back() : action.onClick}
      className={className}
      disabled={action.disabled}
    >
      {action.icon}
    </button>
  );
}
