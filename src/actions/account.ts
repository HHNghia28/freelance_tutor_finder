import type { IAccount } from 'src/types/account';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const ENDPOINT = endpoints.account;
// ----------------------------------------------------------------------

type AccountsData = IAccount[];

export function useGetAccounts(search?: string) {
  const url = [ENDPOINT.list, { params: { search } }];

  const { data, isLoading, error, isValidating, mutate } = useSWR<AccountsData>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      accounts: data || [],
      accountsLoading: isLoading,
      accountsError: error,
      accountsValidating: isValidating,
      accountsMutate: mutate,
      accountsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
