import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    { path: './woff2/Pretendard-Thin.woff2', weight: '100', style: 'normal' },
    { path: './woff2/Pretendard-ExtraLight.woff2', weight: '200', style: 'normal' },
    { path: './woff2/Pretendard-Light.woff2', weight: '300', style: 'normal' },
    { path: './woff2/Pretendard-Regular.woff2', weight: '400', style: 'normal' },
    { path: './woff2/Pretendard-Medium.woff2', weight: '500', style: 'normal' },
    { path: './woff2/Pretendard-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './woff2/Pretendard-Bold.woff2', weight: '700', style: 'normal' },
    { path: './woff2/Pretendard-ExtraBold.woff2', weight: '800', style: 'normal' },
    { path: './woff2/Pretendard-Black.woff2', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-pretendard',
  preload: true,
});
