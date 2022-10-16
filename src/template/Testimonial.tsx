import { Section } from '../layout/Section';
import { TestimonialCard } from '../testimonial/TestimonialCard';

const Testimonial = () => (
  <Section title="Customer's Review" subtitle="Testimonials">
    <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-gray-200">
      <TestimonialCard
        image={{
          src: '/assets/images/avatar.png',
          alt: 'Random name avatar alt text',
        }}
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan rhoncus orci. Suspendisse accumsan rhoncus orci."
        author={{
          name: 'Jennifer Ford',
          position: 'CEO of Something',
        }}
      />
      <TestimonialCard
        image={{
          src: '/assets/images/avatar2.png',
          alt: 'Random name avatar alt text 2',
        }}
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan rhoncus orci. Suspendisse accumsan rhoncus orci."
        author={{
          name: 'Daniel Lawson',
          position: 'Lead developer of Something',
        }}
      />
    </div>
  </Section>
);

export { Testimonial };
