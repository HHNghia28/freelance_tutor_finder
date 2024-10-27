import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------
export async function register(data: {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: string;
  citizenId: string;
}) {
  const url = endpoints.auth.register;
  const response = await axios.post(url, {
    ...data,
    username: 'string',
    gender: 'string',
    location: 'string',
    dateOfBirth: '2024-10-27',
    placeOfWork: 'string',
  });
  return response.data;
}
