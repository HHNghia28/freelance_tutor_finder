import axios, { endpoints } from 'src/utils/axios';

import type { IRole } from '../types/account';

// ----------------------------------------------------------------------
export async function register(data: {
  userName: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender: string;
  photo: string;
  location: string;
  dateOfBirth: string;
  placeOfWork: string;
  role?: IRole;
  grade: string;
}) {
  const url = endpoints.auth.register;
  const response = await axios.post(url, data);
  return response.data;
}

/** **************************************
 * forgot-password
 *************************************** */
export const forgotPassword = async (email: string) => {
  const params = {
    email,
  };

  try {
    const res = await axios.post(endpoints.auth.forgotPassword, params);

    return res;
  } catch (error) {
    console.error('Error during forgot password:', error);
    throw error;
  }
};

/** **************************************
 * reset-password
 *************************************** */
export const resetPassword = async ({
  email,
  token,
  newPassword,
}: {
  email: string;
  token: string;
  newPassword: string;
}) => {
  const params = {
    email,
    token,
    newPassword,
  };

  try {
    const res = await axios.post(endpoints.auth.resetPassword, params);

    return res;
  } catch (error) {
    console.error('Error during reset password:', error);
    throw error;
  }
};
