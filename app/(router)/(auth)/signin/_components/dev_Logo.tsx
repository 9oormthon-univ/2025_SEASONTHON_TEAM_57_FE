'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dev_Logo() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (count > 4) {
      setCount(0);
      console.log('Redirecting to PWA debug page');
      router.push('/pwa-debug');
    }
  }, [count, router]);

  return (
    <>
      <div onClick={() => setCount(count + 1)}></div>
    </>
  );
}
