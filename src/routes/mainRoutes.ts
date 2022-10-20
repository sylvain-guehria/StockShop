export const mainRoutes = {
  home: {
    path: '/',
    label: '',
  },
  register: {
    path: 'register',
    label: "S'inscrire",
  },
  login: {
    path: 'login',
    label: 'Se connecter',
  },
  pricing: {
    path: 'pricing',
    label: 'Prix',
  },
  contact: {
    path: 'contact',
    label: 'Nous Contacter',
  },
};

export const headerRoutes = [mainRoutes.pricing, mainRoutes.contact];
