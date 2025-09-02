'use client';

import clsx from 'clsx';

export default function ButtonBox({
  type = 'button',
  formId,
  children,
  bgColor,
  className,
  innerClassName,
  wFull = false,
  disabled = false,
  onClick,
}: Readonly<{
  type?: 'button' | 'submit' | 'reset';
  formId?: string;
  children: React.ReactNode;
  bgColor: string;
  className?: string;
  innerClassName?: string;
  wFull?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}>) {
  return (
    <button
      type={type}
      form={formId}
      className={clsx(
        wFull ? 'w-full' : 'w-[32.6rem]',
        'h-[6rem] rounded-[1.6rem] text-white',
        disabled && 'grayscale-90',
        className
      )}
      style={{ backgroundColor: bgColor }}
      onClick={disabled ? undefined : onClick}
    >
      <div className={clsx('btn1', innerClassName)}>{children}</div>
    </button>
  );
}
