import type { ITutorStatus } from 'src/types/tutor';

export const TUTOR_STATUS: { [K: string]: ITutorStatus } = {
  WAITTING: 0,
  REJECT: 1,
  APPROVED: 2,
};
