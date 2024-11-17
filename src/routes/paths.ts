// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  USER: '/',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',

  /* -------------------------------------------- */
  /*                    MY APP                    */
  /* -------------------------------------------- */
  // AUTH
  auth: {
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signInReturn: (url: string) => `${ROOTS.AUTH}/jwt/sign-in?returnTo=${url}`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
      resetPassword: `${ROOTS.AUTH}/jwt/reset-password`, // update password
      forgotPassword: `${ROOTS.AUTH}/jwt/forgot-password`,
    },
  },
  guest: {
    news: {
      list: `/tin-tuc-gia-su`,
      details: (slug: any) => `/tin-tuc-gia-su/${slug}`,
    },
    tutor: {
      list: `/tim-gia-su`,
      details: (slug: any) => `/tim-gia-su/${slug}`,
    },
  },
  // USER
  user: {
    root: ROOTS.USER,
    tutor_register: `${ROOTS.USER}dang-ky-lam-gia-su`,
    my_course: {
      list: `${ROOTS.USER}bai-dang-cua-toi`,
      create: `${ROOTS.USER}bai-dang-cua-toi/bai-dang-moi`,
      update: (id: string) => `${ROOTS.USER}bai-dang-cua-toi/${id}/cap-nhat`,
    },
    favorite: `${ROOTS.USER}yeu-thich`,
    profile: `${ROOTS.USER}ho-so`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    account: {
      list: `${ROOTS.DASHBOARD}/account`,
      new: `${ROOTS.DASHBOARD}/account/new`,
      edit: (id: any) => `${ROOTS.DASHBOARD}/account/${id}/edit`,
    },
    news: {
      list: `${ROOTS.DASHBOARD}/news`,
      new: `${ROOTS.DASHBOARD}/news/new`,
      edit: (id: any) => `${ROOTS.DASHBOARD}/news/${id}/edit`,
    },
    payment: `${ROOTS.DASHBOARD}/payment`,
    cv: `${ROOTS.DASHBOARD}/cv`,
    user: {
      root: `${ROOTS.DASHBOARD}/user`,

      list: `${ROOTS.DASHBOARD}/user/list`,
    },
    /* -------------------------------------------- */
    /*                  END MY APP                  */
    /* -------------------------------------------- */
  },
};
