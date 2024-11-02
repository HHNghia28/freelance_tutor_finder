import type { IUser } from '../types/user';

export type UserType =
  | (IUser & {
      accessToken: string;
    })
  | null;

export type AuthState = {
  user: UserType;
  loading: boolean;
};

export type AuthContextValue = {
  user: UserType;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  checkUserSession?: () => Promise<void>;
};
