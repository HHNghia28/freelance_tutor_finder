// ----------------------------------------------------------------------

import axios, { endpoints } from 'src/utils/axios';

// const swrOptions = {
//   revalidateIfStale: true,
//   revalidateOnFocus: false,
//   revalidateOnReconnect: false,
// };

const ENDPOINT = endpoints.feedback;

// ----------------------------------------------------------------------
export async function createFeedback(data: {
  studentId: string;
  tutorAdvertisementsId: string;
  message: string;
}) {
  const url = ENDPOINT.create;
  const response = await axios.post(url, data);
  return response.data;
}
