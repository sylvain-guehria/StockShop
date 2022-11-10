import { PlusCircleIcon } from '@heroicons/react/20/solid';

import { stockManagementRoutes } from '@/routes/stockManagementRoutes';

import MobileStockTable from './MobileStockTable';
import PinnedStocks from './PinnedStocks';
import StockTable from './StockTable';

const projects = [
  {
    id: 1,
    title: 'GraphQL API',
    initials: 'GA',
    team: 'Engineering',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
    totalMembers: 12,
    lastUpdated: 'March 17, 2020',
    pinned: true,
    bgColorClass: 'bg-pink-600',
  },
  // More projects...
];
const pinnedProjects = projects.filter((project) => project.pinned);

const MyStock = () => {
  return (
    <>
      <div className="min-h-full">
        <div className="flex flex-col px-8">
          <main className="flex-1">
            <div className="border-b border-gray-200 p-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                  {stockManagementRoutes.myStock.label}
                </h1>
              </div>
              <div className="mt-4 flex sm:mt-0 sm:ml-4">
                <div className="inline-flex items-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:order-1 sm:ml-3">
                  Créer un nouveau stock
                  <PlusCircleIcon className="ml-3 h-6 w-6 shrink-0 text-primary-100" />
                </div>
              </div>
            </div>
            <div className="mt-6 px-4 sm:px-6 lg:px-8">
              <PinnedStocks stocks={pinnedProjects} />
            </div>

            <MobileStockTable stocks={projects} />
            <StockTable stocks={projects} />
          </main>
        </div>
      </div>
    </>
  );
};

export default MyStock;
