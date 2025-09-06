import Header from '@/components/layout/header';
import Back from '@/public/icons/arrow/left.svg';

export default function CertificateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header
        title="인증하기"
        left={{
          icon: <Back />,
        }}
      />

      <section>{children}</section>
    </div>
  );
}
