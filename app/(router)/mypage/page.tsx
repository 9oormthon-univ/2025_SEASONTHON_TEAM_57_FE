import Bookmark from '@/public/icons/bookmark.svg';
import Clipboard from '@/public/icons/clipboard.svg';
import HelpCircle from '@/public/icons/help-circle.svg';
import Logout from '@/public/icons/logout.svg';
import Monitor from '@/public/icons/monitor.svg';

import ListItem from './_components/ListItem';
import ProfileSection from './_components/ProfileSection';

export default function MyPage() {
  return (
    <main>
      <ProfileSection />

      <ul className="flex flex-col">
        <ListItem Icon={Monitor} label="신뢰도 점수 0000" />
        <ListItem Icon={Bookmark} label="스크랩 게시물 보기" href="#bookmark" />
        <ListItem Icon={Clipboard} label="내 정보 수정" href="#profile" />
        <ListItem Icon={Monitor} label="나의 재능" href="#myskill" />
        <ListItem Icon={HelpCircle} label="고객센터" href="#helpcall" />
        <ListItem Icon={Logout} label="로그아웃" />
      </ul>
    </main>
  );
}
