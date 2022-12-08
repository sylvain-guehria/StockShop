import type { FC } from 'react';

type Props = {
  filterLabel: string;
  filterValue: string;
  onRemove?: (filter: string) => void;
};

const ActiveFilter: FC<Props> = ({ filterLabel, filterValue, onRemove }) => {
  return (
    <span
      key={filterLabel}
      className="inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-700"
    >
      <span>{filterLabel}</span>
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(filterValue)}
          className="ml-1 inline-flex h-4 w-4 shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
        >
          <span className="sr-only">Remove filter for {filterLabel}</span>
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

export default ActiveFilter;
