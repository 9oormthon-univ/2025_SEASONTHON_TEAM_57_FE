import { ON_DOCS_PATH } from '@/constants';
import type { Term } from '@/constants/types';

import AgreementForm from './_components/TermsAgreement';

export default function SignupAgree() {
  const Terms: Term[] = [
    {
      label: '서비스 이용약관',
      href: `${ON_DOCS_PATH}/#terms`,
      required: true,
    },
    {
      label: '개인정보 수집/이용 동의',
      href: `${ON_DOCS_PATH}/#privacy-consent`,
      required: true,
    },
    {
      label: '개인정보 제3자 정보제공 동의',
      href: `${ON_DOCS_PATH}/#privacy-consent`,
      required: true,
    },
    {
      label: '위치기반 서비스 이용약관 동의',
      href: `${ON_DOCS_PATH}/#location-terms`,
      required: true,
    },
  ];
  return (
    <>
      <h2>약관동의</h2>
      <div className="body2 mt-[.8rem]">필수항목 및 선택항목 약관에 동의해 주세요.</div>
      <AgreementForm terms={Terms} />
    </>
  );
}
