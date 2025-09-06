import clsx from 'clsx';

import Avatar from './Avatar';

export type CommentNode = {
  id: string;
  authorName: string;
  avatarUrl?: string;
  content: string;
  createdAt: string;
  replies?: CommentNode[];
};

type Props = {
  node: CommentNode;
  depth?: 0 | 1;
  className?: string;
};

export default function CommentItem({ node, depth = 0, className }: Props) {
  const isReply = depth > 0;
  const avatarSize = 3.6;

  return (
    <div
      className={clsx('w-full', className)}
      style={isReply ? { paddingLeft: '4.0rem' } : undefined}
    >
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

          <div className="mt-[0.8rem] flex items-center gap-[1.2rem]">
            <button className="btn2 text-[var(--gray3)] hover:text-[var(--black)]">좋아요</button>
            <button className="btn2 text-[var(--gray3)] hover:text-[var(--black)]">답글</button>
          </div>

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
