import type { IAccount, IProfile } from 'src/types/account';

import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: true,
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

// ----------------------------------------------------------------------

export function useGetProfile(userId?: string) {
  const url = userId ? ENDPOINT.profile(userId) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR<IProfile>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      profile: data?.id ? data : null,
      profileLoading: isLoading,
      profileError: error,
      profileValidating: isValidating,
      profileMutate: mutate,
      profileEmpty: !isLoading && !data?.id,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------
export async function updateProfile(userId: any, data: any) {
  const url = ENDPOINT.edit_profile(userId);

  const response = await axios.put(url, data);
  return response.data;
}

// ----------------------------------------------------------------------
export async function blockAccount(userId: any) {
  const url = ENDPOINT.block(userId);

  await axios.put(url);
}
// ----------------------------------------------------------------------

export async function unblockAccount(userId: any) {
  const url = ENDPOINT.unblock(userId);

  await axios.put(url);
}
