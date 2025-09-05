'use client';

import clsx from 'clsx';
import React from 'react';

type HeaderProps = {
  title?: string;
  left?: React.ReactNode;
  rightItems?: React.ReactNode[];
  className?: string;
  sticky?: boolean;
};

export default function Header({
  title,
  left,
  rightItems = [],
  className,
  sticky = true,
}: HeaderProps) {
  return (
    <header
      className={clsx(
        'z-50 bg-main/95 backdrop-blur pl-[3.2rem] pr-[3.2rem] h-[6.4rem] flex items-center',
        sticky && 'sticky top-0',
        className
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="min-w-0">
          {left ? left : title ? <h2 className="h2 text-[var(--black)]">{title}</h2> : null}
        </div>

        {rightItems.length > 0 && (
          <div className="flex items-center gap-[2rem] flex-row-reverse">
            {rightItems.map((node, idx) => (
              <span
                key={idx}
                className="inline-flex items-center justify-center shrink-0"
              >
                {node}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
