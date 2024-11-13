export type ITutorStatus = 0 | 1 | 2;

export type ITutor = {
  id: string;
  fullname: string;
  phoneNumber: string;
  photo: string;
  status: ITutorStatus;
  cvUrl: string;
};

export type ITutorDetails = {
  accountId: string;
  fullname: string;
  gender: string;
  phoneNumber: string;
  location: string;
  photo: string;
  dateOfBirth: string;
  registrationDate: string;
  tutorId: string;
  selfIntroduction: string;
  teachingAchievement: string;
  academicSpecialty: string;
  citizenId: string;
  status: ITutorStatus;
  cvUrl: string;
};
