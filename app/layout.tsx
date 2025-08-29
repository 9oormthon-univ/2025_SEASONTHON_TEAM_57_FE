import clsx from 'clsx';
import type { Metadata } from 'next';

import { pretendard } from '@/public/font';

import './globals.css';

export const metadata: Metadata = {
  title: 'ONDA(온다)',
  description: '당신에게 딱 맞는 재능',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scrollbar-hidden"
    >
      <body
        className={clsx(
          pretendard.variable,
          'relative antialiased min-h-dvh h-full bg-main',
          'overscroll-y-contain'
        )}
      >
        <div
          className={clsx(
            'relative mx-auto w-full max-w-[500px]',
            'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]',
            'min-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom))]',
            'h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom))]',
            'overflow-y-scroll scrollbar-hidden'
          )}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
