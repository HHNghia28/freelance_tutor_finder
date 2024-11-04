import type { IFeedback } from './feedback';

export type ICourse = {
  id: string;
  tutorId: string;
  fullname: string;
  title: string;
  description: any;
  thumbnail: string;
  daysPerMonth: string;
  course: string;
  grade: string;
  fee: number;
  updateDate: string;
  startDate: string;
  endDate: string;
  feedbacks: IFeedback[] | null;
};
