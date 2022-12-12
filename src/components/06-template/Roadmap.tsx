import { CheckIcon } from '@heroicons/react/20/solid';
import { ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline';

import { classNames } from '@/utils/tailwindUtils';

import { Section } from '../04-lib/layout/Section';

const StatusRoadmapStepEnum = {
  ONGOING: 'ONGOING',
  DONE: 'DONE',
  FUTURE: 'FUTURE',
};

const timeline = [
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
    date: 'Janvier 2023',
    status: StatusRoadmapStepEnum.ONGOING,
  },
  {
    feature: 'Module création de catégories custom',
    description:
      'Un module permettant au entreprise de créer des catégories de produits custom avec des champs personnalisés',
    date: 'Janvier 2023',
    status: StatusRoadmapStepEnum.FUTURE,
  },
  {
    feature: 'Module marketplace V2 click & collect',
    description:
      'Les visiteurs pourront passer des commandes directement sur le site et payer en ligne ou sur place',
    date: 'Mars 2023',
    status: StatusRoadmapStepEnum.FUTURE,
  },
  {
    feature: 'Module de gestion des stocks V2',
    description: 'Un stock pourra être géré par plusieurs utilisateurs',
    date: 'Avril 2023',
    status: StatusRoadmapStepEnum.FUTURE,
  },
];

const LegendItem = ({
  text,
  Icon,
  iconColor,
}: {
  text: string;
  Icon: (
    props: React.ComponentProps<'svg'> & {
      title?: string;
      titleId?: string;
    }
  ) => JSX.Element;
  iconColor: string;
}) => {
  return (
    <div className="mx-6 p-3">
      <div
        className={classNames(
          'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white',
          iconColor || ''
        )}
      >
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </div>
      <div className="text-sm text-gray-500">{text}</div>
    </div>
  );
};

const Roadmap = () => {
  return (
    <div>
      <div className="bg-gray-100">
        <Section yPadding="pt-10 pb-5">
          <div className="sm:flex sm:flex-col">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-center">
              Roadmap
            </h1>
            <p className="my-5 text-xl text-gray-500 sm:text-center">
              Cette roadmap évolue au fur et à mesure de vos retours
              utilisateurs. Chacune de vos demande de feature est étudiée et
              priorisée.
            </p>
            <p className="text-sm text-gray-500 sm:text-center">
              Les dates sont indicatives et peuvent être modifiées en fonction
              des impératives de l&apos;équipe de développement.
            </p>
          </div>
        </Section>
      </div>

      <Section yPadding="py-10">
        <div className="mb-6 flex justify-center">
          <LegendItem
            text="Terminé"
            Icon={CheckIcon}
            iconColor="bg-green-500"
          />
          <LegendItem
            text="En cours"
            Icon={ArrowPathIcon}
            iconColor="bg-blue-500"
          />
          <LegendItem
            text="Prévu dans le future"
            Icon={ClockIcon}
            iconColor="bg-yellow-400"
          />
        </div>
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {timeline.map((step, eventIdx) => {
              const isLastItem = eventIdx === timeline.length - 1;
              return (
                <li key={step.feature}>
                  <div className="relative pb-8">
                    {!isLastItem && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={classNames(
                            step.status === StatusRoadmapStepEnum.DONE
                              ? 'bg-green-500'
                              : '',
                            step.status === StatusRoadmapStepEnum.FUTURE
                              ? 'bg-yellow-400'
                              : '',
                            step.status === StatusRoadmapStepEnum.ONGOING
                              ? 'bg-blue-500'
                              : '',
                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                          )}
                        >
                          {step.status === StatusRoadmapStepEnum.DONE && (
                            <CheckIcon
                              className="h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          )}
                          {step.status === StatusRoadmapStepEnum.FUTURE && (
                            <ClockIcon
                              className="h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          )}
                          {step.status === StatusRoadmapStepEnum.ONGOING && (
                            <ArrowPathIcon
                              className="h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {step.feature}
                          </div>
                          <p className="text-sm text-gray-500">
                            {step.description}{' '}
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          {step.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>
    </div>
  );
};

export default Roadmap;
