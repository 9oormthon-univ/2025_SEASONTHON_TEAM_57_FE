import Link from 'next/link';
import React from 'react';

import NextJS from '@/public/next.svg';

export default function Home() {
  return (
    <div className="h1">
      <p>Main Page</p>
      <Link className="text-blue-500" href="/challenge">
        임시 챌린지 페이지로 /challenge
      </Link>
      <br />
      <Link className="text-blue-500" href="/skill">
        임시 재능교환소 페이지로 /skill
      </Link>
      <br />
      <Link className="text-blue-500" href="mypage">
        임시 마이페이지로 /mypage
      </Link>
      <br />
      <Link className="text-blue-500" href="alram-center">
        임시 알람센터 페이지로 /alarm-center
      </Link>
    </div>
  );
}
