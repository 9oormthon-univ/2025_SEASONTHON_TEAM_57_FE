import { redirect } from 'next/navigation';

import { PostChallenge } from '@/service/challenge';

import PostChallengeClient from './postChallengeClient';

export default function ChallengePost() {
  async function postChallengeAction(formData: FormData) {
    'use server';

    const challengeTitle = formData.get('challengeTitle');
    const challengeContent = formData.get('challengeContent');
    const challengePhotos = formData.getAll('challengePhotos') as File[];
    const challengeStartDate = formData.get('challengeStartDate');
    const challengeEndDate = formData.get('challengeEndDate');
    const categoryIds = formData.getAll('categoryIds') as string[];

    const trimmedValue = (value: FormDataEntryValue | null) => {
      if (typeof value === 'string') {
        return value.trim();
      }
      return null;
    };

    if (
      !challengeTitle ||
      !trimmedValue(challengeTitle) ||
      !challengeContent ||
      !trimmedValue(challengeContent) ||
      challengePhotos.length === 0 ||
      !challengeStartDate ||
      !trimmedValue(challengeStartDate) ||
      !challengeEndDate ||
      !trimmedValue(challengeEndDate) ||
      categoryIds.length === 0
    ) {
      redirect(`/challenge/post?error=모든 항목을 입력해 주세요.`);
    }

    const title = challengeTitle.toString().trim();
    const content = challengeContent.toString().trim();
    const image = challengePhotos.map(photo => photo.toString());
    const startDate = challengeStartDate.toString().trim();
    const endDate = challengeEndDate.toString().trim();
    const categoryIdsNum = categoryIds.map(id => Number(id));

    console.log({ title, content, image, startDate, endDate, categoryIdsNum });

    if (new Date(startDate) > new Date(endDate)) {
      redirect(`/challenge/post?error=종료일은 시작일보다 빠를 수 없습니다.`);
    }

    try {
      await PostChallenge({
        title,
        content,
        // image,
        startDate,
        endDate,
        categoryIds: categoryIdsNum,
      });
    } catch (error) {
      console.error('Error posting challenge:', error);
      const err = error as Error;
      redirect(`/challenge/post?${err.toString()}`);
    }

    redirect('/');
  }

  return (
    <>
      <PostChallengeClient action={postChallengeAction} />
    </>
  );
}
