import type { IPayment } from 'src/types/payment';

import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------
const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
const ENDPOINT = endpoints.payment;

// ----------------------------------------------------------------------

export function useGetInvoices(search?: string) {
  const url = [ENDPOINT.list, { params: { search } }];

  const { data, isLoading, error, isValidating, mutate } = useSWR<IPayment[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      invoices: data || [],
      invoicesLoading: isLoading,
      invoicesError: error,
      invoicesValidating: isValidating,
      invoicesMutate: mutate,
      invoicesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function payment(tutorAdvertisement: string) {
  const url = ENDPOINT.pay(tutorAdvertisement);
  const response = await axios.get(url);
  return response.data;
}
