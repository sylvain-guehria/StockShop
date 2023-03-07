export const StatusRoadmapStepEnum = {
  ONGOING: 'ONGOING',
  DONE: 'DONE',
  FUTURE: 'FUTURE',
};

export const timeline = [
  {
    feature: 'Lancement du projet',
    description: 'Création du site et de la landing page',
    date: '26 octobre 2022',
    status: StatusRoadmapStepEnum.DONE,
  },
  {
    feature: 'Module de gestion des stocks V1',
    description:
      'Un module permettant de gérer les stocks de vos produits et le réapprovisionnement',
    date: 'Décembre 2022',
    status: StatusRoadmapStepEnum.DONE,
  },
  {
    feature: 'Module marketplace V1',
    description:
      'Un module permettant au visiteur du site de visualiser les stocks de vos produits marqués comme "public"',
    date: 'Avril 2023',
    status: StatusRoadmapStepEnum.ONGOING,
  },
  {
    feature: 'Module création de catégories custom',
    description:
      'Un module permettant au entreprise de créer des catégories de produits custom avec des champs personnalisés',
    date: 'Mai 2023',
    status: StatusRoadmapStepEnum.FUTURE,
  },
  {
    feature: 'Module marketplace V2 click & collect',
    description:
      'Les visiteurs pourront passer des commandes directement sur le site et payer en ligne ou sur place',
    date: 'Mai 2023',
    status: StatusRoadmapStepEnum.FUTURE,
  },
  {
    feature: 'Module de gestion des stocks V2',
    description: 'Un stock pourra être géré par plusieurs utilisateurs',
    date: 'Juin 2023',
    status: StatusRoadmapStepEnum.FUTURE,
  },
];
