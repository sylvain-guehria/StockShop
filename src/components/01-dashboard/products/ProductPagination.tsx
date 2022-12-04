import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';
import { useState } from 'react';

type Props = {
  totalResults: number;
  numberOfResultsPerPage: number;
};

const ProductPagination: FC<Props> = ({
  totalResults = 0,
  numberOfResultsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
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
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Résultats <span className="font-medium">{currentPage * 10 - 9}</span>{' '}
          à{' '}
          <span className="font-medium">
            {currentPage * 10 > totalResults ? totalResults : currentPage * 10}
          </span>{' '}
          sur <span className="font-medium">{totalResults}</span> produits
        </p>
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
          Page 1 sur 2
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

export default ProductPagination;