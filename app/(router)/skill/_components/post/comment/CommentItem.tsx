import clsx from 'clsx';

import Avatar from './Avatar';

export type CommentNode = {
  id: string;
  authorName: string;
  avatarUrl?: string; // 예: "/mypage/sample_profile.png"
  content: string;
  createdAt: string; // 예: "2025-09-06 12:30"
  replies?: CommentNode[];
};

type Props = {
  node: CommentNode;
  depth?: 0 | 1; // 필요하면 더 늘릴 수 있음
  className?: string;
};

export default function CommentItem({ node, depth = 0, className }: Props) {
  const isReply = depth > 0;
  const avatarSize = 3.6; // rem

  return (
    <div
      className={clsx('w-full', className)}
      style={isReply ? { paddingLeft: '4.0rem' } : undefined} // 답글 들여쓰기 40px
    >
      {/* 세로 가이드 라인(답글일 때) */}
      {isReply && (
        <span
          aria-hidden
          className="absolute -ml-[4.0rem] h-full border-l border-[var(--gray1)]"
          style={{ width: 0 }}
        />
      )}

      <div className="flex items-start gap-[1.2rem]">
        <Avatar
          src={node.avatarUrl}
          alt={node.authorName}
          sizeRem={avatarSize}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[0.8rem]">
            <span className="body1 text-[var(--black)] truncate">{node.authorName}</span>
            <span className="caption text-[var(--gray3)]">{node.createdAt}</span>
          </div>

          <p className="body2 text-[var(--black)] mt-[0.4rem] whitespace-pre-wrap break-words">
            {node.content}
          </p>

          {/* 액션 영역(추후 onClick 연결 가능) */}
          <div className="mt-[0.8rem] flex items-center gap-[1.2rem]">
            <button className="btn2 text-[var(--gray3)] hover:text-[var(--black)]">좋아요</button>
            <button className="btn2 text-[var(--gray3)] hover:text-[var(--black)]">답글</button>
          </div>

          {/* 하위 답글 렌더링 */}
          {node.replies?.length ? (
            <div className="mt-[1.2rem] space-y-[1.2rem]">
              {node.replies.map(child => (
                <CommentItem
                  key={child.id}
                  node={child}
                  depth={1}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
