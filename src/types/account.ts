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

export type IProfile = {
  id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  location: string;
  photo: string;
  registrationDate: string;
  isEmailConfirmed: boolean;
  academicSpecialty: string;
  teachingAchievement: string;
  citizenId: string;
  cvUrl: string;
  selfIntroduction: string;
  role: IRole;
};
