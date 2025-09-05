import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="h1">
      <p>Main Page</p>
      <Link
        className="text-blue-500"
        href="/signin"
      >
        임시 로그인 페이지로
      </Link>
      <br />
      <Link
        className="text-blue-500"
        href="/debug"
      >
        임시 디버그 페이지로
      </Link>
    </div>
  );
}
