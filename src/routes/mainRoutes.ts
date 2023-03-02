export const mainRoutes = {
  home: {
    path: '/',
    label: '',
  },
  register: {
    path: '/register',
    label: "S'inscrire",
  },
  login: {
    path: '/login',
    label: 'Se connecter',
  },
  resetPassword: {
    path: '/reset-password',
    label: 'Mot de passe oublié ?',
  },
  pricing: {
    path: '/pricing',
    label: 'Prix',
  },
  contact: {
    path: '/contact',
    label: 'Nous Contacter',
  },
  profile: {
    path: '/profile',
    label: 'Profile',
  },
  roadmap: {
    path: '/roadmap',
    label: 'Roadmap',
  },
};

export const headerRoutes = [
  // mainRoutes.pricing,
  mainRoutes.contact,
  mainRoutes.profile,
];
