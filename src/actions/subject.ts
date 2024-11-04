import type { ISubject } from 'src/types/subject';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
const ENDPOINT = endpoints.subject;

// ----------------------------------------------------------------------
export function useGetSubjects() {
  const url = ENDPOINT.list;

  const { data, isLoading, error, isValidating } = useSWR<ISubject[]>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      subjects: data?.length ? data : [],
      subjectsLoading: isLoading,
      subjectsError: error,
      subjectsValidating: isValidating,
      subjectsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
