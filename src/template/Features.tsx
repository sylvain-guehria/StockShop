import { FeatureElement } from '../feature/FeatureElement';
import { Section } from '../layout/Section';

const Features = () => (
  <Section
    title="Your title here"
    subtitle="Features"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada nisi tellus, non imperdiet nisi tempor at."
  >
    <div className="grid grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2 md:grid-cols-3">
      <FeatureElement
        title="Your title"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M21 12h-4l-3 8-4-16-3 8H3" />
          </svg>
        }
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </FeatureElement>
      <FeatureElement
        title="Your title"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M12 12v.01M19.071 4.929a4 10 45 00-9.9 4.243 4 10 45 00-4.242 9.9 4 10 45 009.9-4.244 4 10 45 004.242-9.9" />
            <path d="M4.929 4.929a10 4 45 004.243 9.9 10 4 45 009.9 4.242 10 4 45 00-4.244-9.9 10 4 45 00-9.9-4.242" />
          </svg>
        }
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </FeatureElement>
      <FeatureElement
        title="Your title"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M3 17l6-6 4 4 8-8" />
            <path d="M14 7h7v7" />
          </svg>
        }
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </FeatureElement>
      <FeatureElement
        title="Your title"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M5 7l5 5-5 5M12 19h7" />
          </svg>
        }
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </FeatureElement>
      <FeatureElement
        title="Your title"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M9 12l2 2 4-4" />
            <path d="M12 3a12 12 0 008.5 3A12 12 0 0112 21 12 12 0 013.5 6 12 12 0 0012 3" />
          </svg>
        }
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </FeatureElement>
      <FeatureElement
        title="Your title"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M20 11A8.1 8.1 0 004.5 9M4 4v5h5M4 13a8.1 8.1 0 0015.5 2m.5 5v-5h-5" />
          </svg>
        }
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </FeatureElement>
    </div>
  </Section>
);

export { Features };
