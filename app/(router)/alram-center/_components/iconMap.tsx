import Message from '@/public/alram/메시지.svg';
import Challenge from '@/public/alram/온다챌린지.svg';
import Talent from '@/public/alram/재능공유.svg';

import type { AlarmType } from './types';

type SvgIconType = React.FC<React.SVGProps<SVGSVGElement>>;

export const ICON_MAP: Record<AlarmType, SvgIconType> = {
  message: Message,
  challenge: Challenge,
  talent: Talent,
};
