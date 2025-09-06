import React from 'react';

import Header from '@/components/layout/header';
import Back from '@/public/icons/arrow/left.svg';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header
        title="재능 공유 게시글 작성"
        left={{
          icon: <Back />,
        }}
      />

      <section>{children}</section>
    </div>
  );
}
