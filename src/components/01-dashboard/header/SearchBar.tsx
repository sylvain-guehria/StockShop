import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export const SearchBar = () => {
  return (
    <div className="flex w-full md:ml-0">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="search-field"
          name="search-field"
          className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          placeholder="Chercher un produit"
          type="search"
        />
      </div>
    </div>
  );
};
