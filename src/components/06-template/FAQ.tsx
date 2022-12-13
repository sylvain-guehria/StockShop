import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { mainRoutes } from '@/routes/mainRoutes';
import { classNames } from '@/utils/tailwindUtils';

import { Section } from '../04-lib/layout/Section';

const faqs = [
  {
    question: "Quel est l'objectif d'Inventory Market ?",
    answer:
      "Notre but premier est d'aider les petites entreprises à gérer leurs inventaires et à avoir une visibilité sur internet.",
  },
  {
    question: 'Comment fonctionne le site pour une entreprise ?',
    answer:
      "Si vous êtes une entreprise, il vous suffit de vous connecter en vous créant un compte. Vous aurez accès à un module de gestion d'inventaire. Vous pourrez ajouter vos produits, les classer par catégories, gérer leur approvisionnement etc... Vous pourrez également ajouter des images à vos produits et décider pour chaque inventaire et chaque produit si celui-ci est privé ou public. Si vous avez un inventaire public, une page dédiée à votre entreprise sera créée sur notre marketplace. Les produits marqués comme public seront visibles sur ce marketplace.",
  },
  {
    question: 'Suis-je obligé de rendre un inventaire public ?',
    answer:
      'Pas du tout. Vous pouvez utiliser ce site uniquement pour son module de gestion des stocks. Par defaut un inventaire est privé. Vous pouvez le rendre public à tout moment.',
  },
  {
    question:
      "J'utilise les catégories pour trier mes produits mais je ne trouve pas la catégorie que je veux ?",
    answer:
      'Nous ajoutons des nouvelles catégories aussi souvent que possible. Ecrivez-nous si vous souhaitez une nouvelle catégorie. Nous la créerons très vite pour vous. De plus une feature vous permettant de créer vos propres catégories est prévue dans la roadmap.',
  },
  {
    question: 'Comment fonctionne le site pour un visiteur ou un client ?',
    answer:
      'Si vous êtes un client, vous pourrez rechercher vos commerces locaux par ville et voir leurs produits. Vous pourrez également vous créer un compte pour suivre vos commandes et avoir une visibilité sur vos achats.',
  },
  {
    question: 'Je ne trouve pas le marketplace ?',
    answer:
      "Le marketpalce est en cours de dévelopment. Il sera disponible prochainement. Vous pouvez nous contacter pour plus d'informations.",
  },
];

const FAQ = () => (
  <Section
    title="Vous avez des questions ?"
    subtitle="FAQ"
    description="Si la réponse à votre question ne se trouve pas ci dessous, n'hésitez pas à nous contacter par email ou via le formulaire disponible sur la page contact."
  >
    <section aria-labelledby="faq-heading" className="bg-white">
      <div>
        <dl className="mt-6 space-y-6 divide-y divide-gray-200">
          {faqs.map((faq) => (
            <Disclosure as="div" key={faq.question} className="pt-6">
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                      <span className="font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        <ChevronDownIcon
                          className={classNames(
                            open ? '-rotate-180' : 'rotate-0',
                            'h-6 w-6 transform'
                          )}
                          aria-hidden="true"
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base text-gray-500">{faq.answer}</p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </section>
    <div className="mt-7 flex max-w-xl text-lg text-gray-500">
      Si vous ne trouvez pas réponse{' '}
      <Link href={mainRoutes.contact.path}>
        <div className="ml-2 text-lg font-medium text-primary-600 hover:text-primary-500">
          envoyez nous un email.
        </div>{' '}
      </Link>
    </div>
  </Section>
);

export { FAQ };
