import clsx from 'clsx';

export default function ShadowBox({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <div className={clsx('shadow-box', className)}>{children}</div>;
}
