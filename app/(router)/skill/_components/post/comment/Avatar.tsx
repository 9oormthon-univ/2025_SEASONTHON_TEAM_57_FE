import Image from 'next/image';

type Props = {
  src?: string; // 예: "/mypage/sample_profile.png"
  alt: string; // 사용자 이름 (이니셜 생성에 사용)
  sizeRem?: number; // 기본 3.2rem
  className?: string;
};

function getInitials(name: string) {
  if (!name) return '';
  // 한글/영문 대응: 공백 기준 앞 2글자
  const trimmed = name.trim();
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return trimmed.slice(0, 2);
  return (parts[0][0] ?? '') + (parts[1][0] ?? '');
}

export default function Avatar({ src, alt, sizeRem = 3.6, className = '' }: Props) {
  const sizePx = `${sizeRem}rem`;
  const initials = getInitials(alt);

  return (
    <div
      className={`relative overflow-hidden rounded-full bg-[var(--gray1)] flex items-center justify-center ${className}`}
      style={{ width: sizePx, height: sizePx }}
      aria-label={alt}
      title={alt}
    >
      {src ? (
        <Image
          src={src.startsWith('/') ? src : `/${src}`}
          alt={alt}
          fill
          sizes={`${sizeRem * 10}px`} // 루트가 10px이므로 rem*10 = px
          className="object-cover"
          priority={false}
        />
      ) : (
        <span className="body1 text-[var(--gray4)] select-none">{initials}</span>
      )}
    </div>
  );
}
