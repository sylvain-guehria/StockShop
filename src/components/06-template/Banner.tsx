import { mainRoutes } from '@/routes/mainRoutes';

import { CTABanner } from '../04-lib/cta/CTABanner';
import { Section } from '../04-lib/layout/Section';
import LinkButton from '../04-lib/LinkButton/LinkButton';

const Banner = () => (
  <Section yPadding="pb-16">
    <CTABanner
      title="Vous êtes prêt à gérer votre stock de manière simple et intuitive ?"
      subtitle="Commencez dès maintenant."
      button={
        <LinkButton href={mainRoutes.register.path} style="secondary">
          Créé votre compte gratuitement
        </LinkButton>
      }
    />
  </Section>
);

export { Banner };
