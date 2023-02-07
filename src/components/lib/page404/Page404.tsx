import '../../../styles/global.css';

import Link from 'next/link';

export default function Page404Component() {
  return (
    <div className="bg-white">
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl sm:py-24">
          <div className="text-center">
            <p className="text-base font-semibold text-primary-600">404</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Cette page n&apos;existe pas
            </h1>
            <p className="mt-2 text-lg text-gray-500">
              Êtes vous sur de l&apos;url ?
            </p>
          </div>
          <div className="mt-6">
            <div className="mx-auto h-full w-full text-center">
              <iframe
                height={600}
                width={'100%'}
                src="https://embed.lottiefiles.com/animation/98642"
              ></iframe>
            </div>
            <div className="mt-8">
              <Link
                href="/"
                className="text-base font-medium text-primary-600 hover:text-primary-500"
              >
                Retour sur le site
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 py-12 text-center md:flex md:justify-between">
          <p className="text-base text-gray-400">
            &copy; Inventory Market, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
