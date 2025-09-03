import Award from '@/public/icons/award.svg';
import Clipboard from '@/public/icons/clipboard.svg';
import HelpCircle from '@/public/icons/help-circle.svg';
import LogOut from '@/public/icons/logout.svg';
import Monitor from '@/public/icons/monitor.svg';
import Trash from '@/public/icons/trash.svg';

import ListItem from './_components/ListItem';
import ProfileSection from './_components/ProfileSection';

export default function MyPage() {
  return (
    <main>
      <ProfileSection />

      <ul className="flex flex-col">
        <ListItem Icon={Clipboard} label="내 정보 수정" href="#profile" />
        <ListItem Icon={Monitor} label="나의 재능" href="#talent" />
        <ListItem Icon={HelpCircle} label="고객센터" href="#cs" />
        <ListItem Icon={Award} label="등급표" href="#grade" />
        <ListItem Icon={LogOut} label="로그아웃" href="#logout" />
        <ListItem Icon={Trash} label="회원탈퇴" href="#withdraw" />
      </ul>
    </main>
  );
}
