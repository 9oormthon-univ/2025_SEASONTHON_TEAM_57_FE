export type AlarmType = 'message' | 'challenge' | 'talent';

export type AlarmItem = {
  id: string;
  type: AlarmType;
  message: string;
  createdAt: string;
};
