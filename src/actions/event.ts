import type { IEvent } from 'src/types/event';

import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const ENDPOINT = endpoints.event;
// ----------------------------------------------------------------------

export function useGetEvents() {
  const url = ENDPOINT.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<IEvent[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      events: data?.length ? data : [],
      eventsLoading: isLoading,
      eventsMutate: mutate,
      eventsError: error,
      eventsValidating: isValidating,
      eventsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetEvent(id: string) {
  const url = id ? ENDPOINT.details(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR<IEvent>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      event: data?.id ? data : null,
      eventLoading: isLoading,
      eventMutate: mutate,
      eventError: error,
      eventValidating: isValidating,
      eventEmpty: !isLoading && !data?.id,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------
type CreatePayload = {
  title: string;
  description: string;
  createBy: string;
  thumbnail: string;
};
export async function createEvent(data: CreatePayload) {
  const url = ENDPOINT.create;
  const response = await axios.post(url, data);
  return response.data;
}
// ----------------------------------------------------------------------

export async function updateEvent(id: string, data: Partial<CreatePayload>) {
  const url = id ? ENDPOINT.update(id) : '';
  const response = await axios.put(url, data);
  return response.data;
}
// ----------------------------------------------------------------------
export async function deleteEvent(id: string) {
  const url = id ? ENDPOINT.delete(id) : '';
  const response = await axios.delete(url);
  return response.data;
}
