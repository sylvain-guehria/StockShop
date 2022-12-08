import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';

type Props = {
  totalResults: number;
  numberOfResultsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination: FC<Props> = ({
  totalResults = 0,
  numberOfResultsPerPage = 10,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalResults / numberOfResultsPerPage);

  const handleNextPageClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <nav
      className="flex items-center justify-between rounded-lg border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        {totalResults > 0 ? (
          <p className="text-sm text-gray-700">
            Résultats{' '}
            <span className="font-medium">
              {currentPage * numberOfResultsPerPage - 9}
            </span>{' '}
            à{' '}
            <span className="font-medium">
              {currentPage * 10 > totalResults
                ? totalResults
                : currentPage * numberOfResultsPerPage}
            </span>{' '}
            sur <span className="font-medium">{totalResults}</span>
          </p>
        ) : (
          <p className="text-sm text-gray-700">
            {' '}
            <span className="font-medium">Aucun résultat</span>
          </p>
        )}
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <div
          onClick={handlePreviousPageClick}
          className="relative inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <span className="sr-only">Page précédente</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="relative ml-3 inline-flex items-center  bg-white px-4 py-2 text-sm font-medium text-gray-700">
          {totalPages ? `Page ${currentPage} sur ${totalPages}` : ''}
        </div>
        <div
          onClick={handleNextPageClick}
          className="relative ml-3 inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <span className="sr-only">Page suivant</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
