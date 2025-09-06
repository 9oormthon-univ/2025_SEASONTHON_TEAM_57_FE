import { redirect } from 'next/navigation';

import PostChallengeClient from './postChallengeClient';

export default function ChallengePost() {
  async function postChallenge(formData: FormData) {
    'use server';

    const challengeTitle = formData.get('challengeTitle');
    const chellenegePeriod = formData.get('chellenegePeriod');
    const challengeContent = formData.get('challengeContent');
    const challengePhotos = formData.getAll('challengePhotos');

    const trimmedValue = (value: FormDataEntryValue | null) => {
      if (typeof value === 'string') {
        return value.trim();
      }
      return null;
    };

    const title = trimmedValue(challengeTitle);

    // if (!title || !realName || !birthDate) {
    //   redirect('/signup/complete?error=required');
    // }

    // try {
    //   await RegisterUser({ nickname, realName, birthDate });
    // } catch (error) {
    //   redirect(`/signup/complete?error=${(error as Error).message}`);
    // }

    redirect('/');
  }

  return (
    <>
      <PostChallengeClient action={postChallenge}></PostChallengeClient>
    </>
  );
}
