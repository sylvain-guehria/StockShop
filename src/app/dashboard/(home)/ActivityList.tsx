import { BanknotesIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const transactions = [
  {
    id: 1,
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  {
    id: 2,
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'processing',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  {
    id: 3,
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'failed',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  // More transactions...
];

const ActivityList = () => {
  return (
    <div className="shadow sm:hidden">
      <ul
        role="list"
        className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
      >
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <a
              href={transaction.href}
              className="block bg-white p-4 hover:bg-gray-50"
            >
              <span className="flex items-center space-x-4">
                <span className="flex flex-1 space-x-2 truncate">
                  <BanknotesIcon
                    className="h-5 w-5 shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="flex flex-col truncate text-sm text-gray-500">
                    <span className="truncate">{transaction.name}</span>
                    <span>
                      <span className="font-medium text-gray-900">
                        {transaction.amount}
                      </span>{' '}
                      {transaction.currency}
                    </span>
                    <time dateTime={transaction.datetime}>
                      {transaction.date}
                    </time>
                  </span>
                </span>
                <ChevronRightIcon
                  className="h-5 w-5 shrink-0 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <nav
        className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
        aria-label="Pagination"
      >
        <div className="flex flex-1 justify-between">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Next
          </a>
        </div>
      </nav>
    </div>
  );
};
export default ActivityList;
