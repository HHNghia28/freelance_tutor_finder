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

export function useGetPaymentStatistic(
  startDate: string,
  endDate: string,
  groupBy: 'day' | 'month' | 'year'
) {
  const url = [ENDPOINT.statistic, { params: { startDate, endDate, groupBy } }];

  const { data, isLoading, error, isValidating, mutate } = useSWR<
    { group: string; totalAmount: number }[]
  >(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      statistics: data || [],
      statisticsLoading: isLoading,
      statisticsError: error,
      statisticsValidating: isValidating,
      statisticsMutate: mutate,
      statisticsEmpty: !isLoading && !data?.length,
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

// ----------------------------------------------------------------------

export async function studentPayment(tutorAdvertisement: string, studentId: string) {
  const url = ENDPOINT.student_pay(tutorAdvertisement, studentId);
  const response = await axios.get(url);
  return response.data;
}
