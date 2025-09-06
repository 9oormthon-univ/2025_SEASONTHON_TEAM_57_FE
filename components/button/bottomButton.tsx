'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Modal from '@/components/modal/modal';

import ButtonBox from './buttonBox';

export default function BottomButton({
  button,
  modal,
  description,
}: Readonly<{
  button: {
    buttonText: string;
    disabled?: boolean;
    onClick?: () => void;
    href?: string;
  };
  modal?: {
    formId: string;
    title: string;
    loadingText: string;
  };
  description?: string;
}>) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="fixed flex justify-center inset-x-0 bottom-[3.2rem] z-[100]">
        <div className="flex w-full max-w-[50rem] px-[3.2rem]">
          {description && (
            <div
              className={clsx(
                'absolute top-[-2.8rem] left-1/2 -translate-x-1/2',
                'caption text-center text-gray3'
              )}
            >
              {description}
            </div>
          )}
          <ButtonBox
            onClick={
              button && button.href !== undefined
                ? () => button.href && router.push(button.href)
                : modal
                ? () => setOpen(true)
                : button.onClick
            }
            bgColor="var(--primary)"
            className="max-w-[43.6rem] text-white"
            disabled={button.disabled}
            wFull
          >
            {button.buttonText}
          </ButtonBox>
        </div>
      </div>
      {modal && open && (
        <Modal
          formId={modal.formId}
          title={modal.title}
          loadingText={modal.loadingText}
          onCancel={() => setOpen(false)}
          open={open}
        />
      )}
    </>
  );
}
