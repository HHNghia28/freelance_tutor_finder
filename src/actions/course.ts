import type { ICourse } from 'src/types/course';

import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const ENDPOINT = endpoints.course;

// ----------------------------------------------------------------------

export function useGetCourses() {
  const url = ENDPOINT.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<ICourse[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      courses: data?.length ? data : [],
      coursesLoading: isLoading,
      coursesMutate: mutate,
      coursesError: error,
      coursesValidating: isValidating,
      coursesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetMyCourse(id: string | any, isTutor?: boolean) {
  const url = isTutor ? ENDPOINT.tutor_course(id) : ENDPOINT.student_course(id);

  const { data, isLoading, error, isValidating, mutate } = useSWR<ICourse[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      courses: data?.length ? data : [],
      coursesLoading: isLoading,
      coursesMutate: mutate,
      coursesError: error,
      coursesValidating: isValidating,
      coursesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetCourse(id: string) {
  const url = id ? ENDPOINT.details(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR<ICourse>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      course: data?.id ? data : null,
      courseLoading: isLoading,
      courseMutate: mutate,
      courseError: error,
      courseValidating: isValidating,
      courseEmpty: !isLoading && !data?.id,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function joinCourse(data: {
  tutorAdvertisementsId: string;
  studentId: string;
  title: string;
  paper: string;
}) {
  const response = await axios.post(ENDPOINT.join, data);
  return response.data;
}
// ----------------------------------------------------------------------
type CreatePayload = {
  title: string;
  description: string;
  thumbnail: string;
  daysPerMonth: string;
  courseId: string;
  gradeId: string;
  fee: number;
  startDate: string;
  endDate: string;
  tutorId: string;
};
export async function createCourse(data: CreatePayload) {
  const url = ENDPOINT.create;
  const response = await axios.post(url, data);
  return response.data;
}
// ----------------------------------------------------------------------
type UpdatePayload = {
  title?: string;
  description?: string;
  thumbnail?: string;
  daysPerMonth?: string;
  courseId?: string;
  gradeId?: string;
  fee?: number;
  startDate?: string;
  endDate?: string;
};
export async function updateCourse(id: string, data: UpdatePayload) {
  const url = id ? ENDPOINT.update(id) : '';
  const response = await axios.put(url, data);
  return response.data;
}
// ----------------------------------------------------------------------
export async function deleteCourse(id: string) {
  const url = id ? ENDPOINT.delete(id) : '';
  const response = await axios.delete(url);
  return response.data;
}
