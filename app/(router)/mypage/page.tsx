'use client';
import React from 'react';

import Bookmark from '@/public/icons/bookmark.svg';
import Clipboard from '@/public/icons/clipboard.svg';
import HelpCircle from '@/public/icons/help-circle.svg';
import Logout from '@/public/icons/logout.svg';
import Monitor from '@/public/icons/monitor.svg';

import ListItem from './_components/ListItem';
import ProfileSection from './_components/ProfileSection';
import ReliabilityItem from './_components/reliability';

export default function MyPage() {
  const [reliabilityScore, setReliabilityScore] = React.useState(0);
  return (
    <main>
      <ProfileSection />

      <ul className="flex flex-col">
        <ReliabilityItem
          Icon={Monitor}
          label={`신뢰도 점수 ${reliabilityScore}점`}
        />
        <ListItem
          Icon={Bookmark}
          label="나의 챌린지"
          href="/mypage/bookmark"
        />
        <ListItem
          Icon={Clipboard}
          label="내 정보 수정"
          href="/mypage/profile"
        />
        <ListItem
          Icon={Monitor}
          label="나의 재능"
          href="/mypage/myskill"
        />
        <ListItem
          Icon={HelpCircle}
          label="고객센터"
          href="/mypage/help"
        />
        <ListItem
          Icon={Logout}
          label="로그아웃"
        />
      </ul>
    </main>
  );
}
