import type { IFeedback } from './feedback';

export type ITutorAdvStatus = 'WAITTING' | 'PAIDED' | 'CANCEL';

export type ITutorAdv = {
  id: string;
  tutorId: string;
  fullname: string;
  phoneNumber: string | null;
  email: string | null;
  title: string;
  description: any;
  thumbnail: string;
  daysPerMonth: string;
  course: string;
  grade: string;
  fee: number;
  discount: number;
  photo: string;
  numberOfStudent: number;
  updateDate: string;
  startDate: string;
  endDate: string;
  status: ITutorAdvStatus;
  contractId: string;
  feedbacks: IFeedback[] | null;
};