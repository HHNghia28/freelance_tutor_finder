import axios, { endpoints } from 'src/utils/axios';

const ENDPOINT = endpoints.tutor;

export async function tutorRegister(data: {
  userId: string;
  selfIntroduction: string;
  teachingAchievement: string;
  academicSpecialty: string;
  citizenId: string;
  cvUrl: string;
}) {
  const response = await axios.post(ENDPOINT.register, data);
  return response.data;
}
