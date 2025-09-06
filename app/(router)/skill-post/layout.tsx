import Header from '@/components/layout/header';
import Back from '@/public/icons/left-arrow.svg';
import Share from '@/public/icons/share.svg';

import Comment from './_components/comment';

export default function PostPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        left={{
          icon: <Back />,
        }}
        right={[{ icon: <Share />, href: '#share' }]}
      />
      <section className="flex-1 overflow-y-auto px-[3.2rem] pt-[2.2rem] pb-8">{children}</section>

      <Comment />
    </>
  );
}
