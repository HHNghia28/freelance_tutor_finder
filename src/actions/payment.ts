import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const ENDPOINT = endpoints.payment;

// ----------------------------------------------------------------------
export async function payment(tutorAdvertisement: string) {
  const url = ENDPOINT.pay(tutorAdvertisement);
  const response = await axios.get(url);
  return response.data;
}
