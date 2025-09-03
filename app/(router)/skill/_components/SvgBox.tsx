'use client';

import clsx from 'clsx';
import React from 'react';

type SvgBoxProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: number;
  label?: string;
  className?: string;
};

export default function SvgBox({ Icon, size = 24, label, className = '' }: SvgBoxProps) {
  return (
    <span
      className={clsx('inline-flex items-center justify-center shrink-0', className)}
      style={{ height: size, width: 'auto' }}
      aria-hidden={!label}
    >
      <Icon
        style={{ height: size, width: 'auto', display: 'block' }}
        preserveAspectRatio="xMidYMid meet"
        aria-label={label}
        role={label ? 'img' : undefined}
      />
    </span>
  );
}
