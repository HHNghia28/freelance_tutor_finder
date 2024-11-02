export type IRole = 'Student' | 'Tutor' | 'Admin';

export type IAccount = {
  userId: string;
  userName: string;
  password: string;
  gender: string;
  email: string;
  phoneNumber: string;
  phoneNumber2: any;
  resetToken: any;
  resetTokenExpiry: any;
  dateOfBirth: string;
  registrationDate: string;
  placeOfWork: string;
  citizenId: string;
  isEmailConfirmed: boolean;
  _Student: any;
  _Tutor: any;
  role: IRole;
  roleId: string;
  locationId: any;
  location: any;
  _Events: any;
  _Feedbacks: any;
  _FeedbacksAbout: any;
  updateDate: string;
};
