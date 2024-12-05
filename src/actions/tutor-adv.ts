import type { ITutorAdv } from 'src/types/tutor-adv';

import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const ENDPOINT = endpoints.tutor_adv;

// ----------------------------------------------------------------------

export function useGetTutorAdvs() {
  const url = ENDPOINT.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<ITutorAdv[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      tutorAdvs: data?.length ? data : [],
      tutorAdvsLoading: isLoading,
      tutorAdvsMutate: mutate,
      tutorAdvsError: error,
      tutorAdvsValidating: isValidating,
      tutorAdvsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetMyTutorAdv(id: string | any, isTutor?: boolean) {
  const url = isTutor ? ENDPOINT.tutor_course(id) : ENDPOINT.my_favorite(id);

  const { data, isLoading, error, isValidating, mutate } = useSWR<ITutorAdv[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      tutorAdvs: data?.length ? data : [],
      tutorAdvsLoading: isLoading,
      tutorAdvsMutate: mutate,
      tutorAdvsError: error,
      tutorAdvsValidating: isValidating,
      tutorAdvsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------

export function useGetTutorAdvRegister(id: string | any) {
  const url = ENDPOINT.register(id);

  const { data, isLoading, error, isValidating, mutate } = useSWR<ITutorAdv[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      tutorAdvs: data?.length ? data : [],
      tutorAdvsLoading: isLoading,
      tutorAdvsMutate: mutate,
      tutorAdvsError: error,
      tutorAdvsValidating: isValidating,
      tutorAdvsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------

export function useGetTutorAdvDisbursals() {
  const url = ENDPOINT.disbursal_list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<ITutorAdv[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      tutorAdvs: data?.length ? data : [],
      tutorAdvsLoading: isLoading,
      tutorAdvsMutate: mutate,
      tutorAdvsError: error,
      tutorAdvsValidating: isValidating,
      tutorAdvsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------

export function useGetTutorAdv(id: string) {
  const url = id ? ENDPOINT.details(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR<ITutorAdv>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      tutorAdv: data?.id ? data : null,
      tutorAdvLoading: isLoading,
      tutorAdvMutate: mutate,
      tutorAdvError: error,
      tutorAdvValidating: isValidating,
      tutorAdvEmpty: !isLoading && !data?.id,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
type CreatePayload = {
  title: string;
  description: string;
  thumbnail: string;
  freeCourses: string[];
  daysPerMonth: string;
  courseId: string;
  gradeId: string;
  fee: number;
  startDate: string;
  endDate: string;
  tutorId: string;
};
export async function createTutorAdv(data: CreatePayload) {
  const url = ENDPOINT.create;
  const response = await axios.post(url, data);
  return response.data;
}
// ----------------------------------------------------------------------
type UpdatePayload = {
  title?: string;
  description?: string;
  thumbnail?: string;
  freeCourses?: string[];
  daysPerMonth?: string;
  courseId?: string;
  gradeId?: string;
  fee?: number;
  startDate?: string;
  endDate?: string;
};
export async function updateTutorAdv(id: string, data: UpdatePayload) {
  const url = id ? ENDPOINT.update(id) : '';
  const response = await axios.put(url, data);
  return response.data;
}
// ----------------------------------------------------------------------
export async function addToFavorite(data: { studentId: string; tutorAdvertisementsId: string }) {
  const url = ENDPOINT.add_to_favorite;
  const response = await axios.post(url, data);
  return response.data;
}
// ----------------------------------------------------------------------
export async function removeFavorite(data: { studentId: string; tutorAdvertisementsId: string }) {
  const url = ENDPOINT.remove_favorite;
  const response = await axios.delete(url, {
    data,
  });
  return response.data;
}
// ----------------------------------------------------------------------
export async function deleteTutorAdv(id: string) {
  const url = id ? ENDPOINT.delete(id) : '';
  const response = await axios.delete(url);
  return response.data;
}
// ----------------------------------------------------------------------
export async function disbursalTutorAdv(tutorAdvertisementsId: string) {
  const url = ENDPOINT.disbursal(tutorAdvertisementsId);
  const response = await axios.put(url);
  return response.data;
}
