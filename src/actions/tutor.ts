import type { ITutor, ITutorStatus, ITutorDetails } from 'src/types/tutor';

import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const ENDPOINT = endpoints.tutor;
// ----------------------------------------------------------------------

export function useGetTutors(status?: ITutorStatus) {
  const url = [
    ENDPOINT.list,

    {
      params: {
        status,
      },
    },
  ];

  const { data, isLoading, error, isValidating, mutate } = useSWR<ITutor[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      tutors: data?.length ? data : [],
      tutorsLoading: isLoading,
      tutorsMutate: mutate,
      tutorsError: error,
      tutorsValidating: isValidating,
      tutorsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetTutor(id: string) {
  const url = id ? ENDPOINT.details(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR<ITutorDetails>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      tutor: data?.cvUrl ? data : null,
      tutorLoading: isLoading,
      tutorMutate: mutate,
      tutorError: error,
      tutorValidating: isValidating,
      tutorEmpty: !isLoading && !data?.cvUrl,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

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

export async function tutorApproved(id: string) {
  const url = id ? ENDPOINT.approved(id) : '';
  const response = await axios.put(url);
  return response.data;
}

export async function tutorReject(id: string) {
  const url = id ? ENDPOINT.reject(id) : '';
  const response = await axios.put(url);
  return response.data;
}
