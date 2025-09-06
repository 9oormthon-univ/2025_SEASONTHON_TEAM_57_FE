import SvgBox from './SvgBox';

type ItemProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
};

export default function ReliabilityItem({ Icon, label }: ItemProps) {
  return (
    <li className="border-b border-[var(--gray1)] last:border-b-0">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 h-[60px] px-2 active:opacity-90">
        <SvgBox
          Icon={Icon}
          size={24}
        />
        <span className={`body2 leading-[24px]`}>{label}</span>

        <span
          aria-hidden
          className="flex items-center justify-center h-6 w-6"
        ></span>
      </div>
    </li>
  );
}
