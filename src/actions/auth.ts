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
