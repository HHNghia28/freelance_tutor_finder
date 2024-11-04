import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  /* ------------------ MY APP ------------------ */
  account: {
    list: '/api/admin/users',
    block: (userId: any) => `/api/admin/users/${userId}/block`,
  },
  auth: {
    me: '/api/auth/me',
    signIn: '/api/Account/login',
    register: '/api/Account/register',
    forgotPassword: '/api/Account/forgot-password',
    resetPassword: '/api/Account/reset-password',
  },
  grade: { list: '/api/Grades' },
  subject: { list: '/api/Courses' },
  file_upload: '/api/FileUpload/upload',
  tutor: {
    register: '/api/Tutors',
    list: '/api/Tutors',
    details: (id: string) => `/api/Tutors/${id}`,
    approved: (id: string) => `/api/Tutors/${id}/approved`,
    reject: (id: string) => `/api/Tutors/${id}/reject`,
  },
  course: {
    list: '/api/TutorAdvertisements',
    details: (id: string) => `/api/TutorAdvertisements/${id}`,
    update: (id: string) => `/api/TutorAdvertisements/${id}`,
    delete: (id: string) => `/api/TutorAdvertisements/${id}`,
    create: `/api/TutorAdvertisements`,
    join: `/api/TutorAdvertisements/join`,
    student_course: (id: string) => `/api/TutorAdvertisements/student/${id}`,
    tutor_course: (id: string) => `/api/TutorAdvertisements/tutor/${id}`,
  },
  /* ---------------- END MY APP ---------------- */
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
