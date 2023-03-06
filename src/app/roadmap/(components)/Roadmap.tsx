import { CheckIcon } from '@heroicons/react/20/solid';
import { ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import Section from '../../../components/lib/layout/Section';
import { LegendItem } from './LegendItem';
import { StatusRoadmapStepEnum, timeline } from './roadmapItems';

const Roadmap = () => {
  return (
    <div>
      <div className="bg-gray-100">
        <Section yPadding="py-28">
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
                          className={clsx(
                            step.status === StatusRoadmapStepEnum.DONE
                              ? 'bg-green-500'
                              : '',
                            step.status === StatusRoadmapStepEnum.FUTURE
                              ? 'bg-yellow-400'
                              : '',
                            step.status === StatusRoadmapStepEnum.ONGOING
                              ? 'bg-blue-500'
                              : '',
                            'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white'
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
