import type { ITutorAdvStatus } from 'src/types/tutor-adv';

export const TUTOR_ADV_STATUS: { [key in ITutorAdvStatus]: number } = {
  WAITTING: 0,
  PAIDED: 1,
  CANCEL: 2,
};
