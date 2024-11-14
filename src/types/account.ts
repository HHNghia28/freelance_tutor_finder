export type IRole = 'Student' | 'Tutor' | 'Admin';

export type IAccount = {
  id: string;
  fullname: string;
  phoneNumber: string;
  photo: string;
  email: string;
  role: IRole;
  isBlocked: boolean;
};
