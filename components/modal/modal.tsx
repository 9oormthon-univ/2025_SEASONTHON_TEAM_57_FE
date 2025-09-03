import clsx from 'clsx';
import { useFormStatus } from 'react-dom';

import ButtonBox from '@/components/button/buttonBox';
import styles from '@/styles/modal.module.css';

export default function Modal({
  formId,
  title,
  loadingText,
  open,
  onCancel,
}: {
  formId: string;
  title: string;
  loadingText: string;
  open: boolean;
  onCancel: () => void;
}) {
  const { pending } = useFormStatus();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[100]"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute bg-[#DDE7E780] w-full h-full z-[101]"
        onClick={onCancel}
      />
      <div className={clsx(styles.modal, 'flex flex-col')}>
        {pending ? (
          <div className="w-full h-full flex flex-col justify-center items-center gap-[1.2rem]">
            <div className="body1">{loadingText}</div>
            <div className={styles.circle}></div>
          </div>
        ) : (
          <>
            <div className="body1 mt-[2rem] mb-[3.2rem] text-center">{title}</div>
            <div className="flex justify-between gap-[3.2rem]">
              <ButtonBox
                type="submit"
                bgColor="var(--primary)"
                formId={formId}
                disabled={!open}
                className="!border !border-[var(--primary)]"
              >
                예
              </ButtonBox>
              <ButtonBox
                onClick={onCancel}
                bgColor="white"
                className="!border !border-[var(--gray2)]"
              >
                아니요
              </ButtonBox>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
