import { Section } from '../04-lib/layout/Section';

const GetEarlyAccessIncentive = () => {
  return (
    <Section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:gap-x-8">
          <div className="flex items-center rounded-lg bg-gray-100 p-6 sm:p-10">
            <div className="mx-auto max-w-sm">
              <h3 className="font-semibold text-gray-900">
                Sign up for our newsletter
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <form className="mt-4 sm:mt-6 sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="text"
                  autoComplete="email"
                  required
                  className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 shadow-sm placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:shrink-0">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="relative mt-6 flex items-center py-12 px-6 sm:py-16 sm:px-10 lg:mt-0">
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <img
                src="https://tailwindui.com/img/ecommerce-images/footer-02-exclusive-sale.jpg"
                alt=""
                className="h-full w-full object-cover object-center saturate-0"
              />
              <div className="absolute inset-0 bg-primary-600/90" />
            </div>
            <div className="relative mx-auto max-w-sm text-center">
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Get early access
              </h3>
              <p className="mt-2 text-gray-200">
                Did you sign up to the newsletter? If so, use the keyword we
                sent you to get access.{' '}
                <a
                  href="#"
                  className="whitespace-nowrap font-bold text-white hover:text-gray-200"
                >
                  Go now<span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default GetEarlyAccessIncentive;
