import { Section } from '../lib/layout/Section';

const faqs = [
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // More questions...
];

const FAQ = () => (
  <Section
    title="You have Questions?"
    subtitle="FAQ"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada nisi tellus, non imperdiet nisi tempor at."
  >
    <section aria-labelledby="faq-heading" className="bg-white">
      <div>
        <dl className="mt-12 grid grid-cols-1 gap-y-10 sm:mt-16 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
          {faqs.map((faq) => (
            <div key={faq.id}>
              <dt className="text-lg font-medium text-gray-900">
                {faq.question}
              </dt>
              <dd className="mt-3 text-lg text-gray-500">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
    <div className="mt-7 max-w-xl">
      <p className="mt-4 text-lg text-gray-500">
        Si vous ne trouvez pas réponse{' '}
        <a
          href="#"
          className="text-lg font-medium text-primary-600 hover:text-primary-500"
        >
          envoyez nous un email.
        </a>{' '}
      </p>
    </div>
  </Section>
);

export { FAQ };
