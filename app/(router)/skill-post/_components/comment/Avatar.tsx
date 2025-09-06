import Image from 'next/image';

type Props = {
  src?: string;
  alt: string;
  sizeRem?: number;
  className?: string;
};

function getInitials(name: string) {
  if (!name) return '';
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
          sizes={`${sizeRem * 10}px`}
          className="object-cover"
          priority={false}
        />
      ) : (
        <span className="body1 text-[var(--gray4)] select-none">{initials}</span>
      )}
    </div>
  );
}
