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
  resetPasswordEmail: {
    path: '/reset-password-email',
    label: 'Mot de passe oublié ?',
  },
  resetPassword: {
    path: 'reset-password',
    label: 'Réinitialiser le mot de passe',
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
