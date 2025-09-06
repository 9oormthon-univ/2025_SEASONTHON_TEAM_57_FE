import React from 'react';

type SvgBoxProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: number;
  label?: string;
  className?: string;
  viewBox?: string;
};

export default function SvgBox({ Icon, size = 24, label, className = '', viewBox }: SvgBoxProps) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={!label}
    >
      <Icon
        width={size}
        height={size}
        {...(viewBox ? { viewBox } : {})}
        preserveAspectRatio="xMidYMid meet"
        className="block w-full h-full"
        aria-label={label}
        role={label ? 'img' : undefined}
      />
    </span>
  );
}
