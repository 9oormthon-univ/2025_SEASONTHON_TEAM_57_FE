import CommentItem, { type CommentNode } from './CommentItem';

type Props = {
  items: CommentNode[];
  className?: string;
  ctn_message?: number;
};

export default function Comments({ items, className, ctn_message }: Props) {
  return (
    <section className={className}>
      <p className="body1 mb-[1.6rem]">댓글 {ctn_message}</p>
      <div className="space-y-[2.0rem]">
        {items.map(c => (
          <CommentItem
            key={c.id}
            node={c}
          />
        ))}
      </div>
    </section>
  );
}
