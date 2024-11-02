import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import type { IGrade } from '../types/grade';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
const ENDPOINT = endpoints.grade;

// ----------------------------------------------------------------------
export function useGetGrades() {
  const url = ENDPOINT.list;

  const { data, isLoading, error, isValidating } = useSWR<IGrade[]>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      grades: data?.length ? data : [],
      gradesLoading: isLoading,
      gradesError: error,
      gradesValidating: isValidating,
      gradesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
