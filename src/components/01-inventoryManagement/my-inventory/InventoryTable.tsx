import type { FC } from 'react';

import type { Inventory } from './PinnedInventories';

type Props = {
  inventories: Inventory[];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const InventoryTable: FC<Props> = ({ inventories }) => {
  return (
    <div className="mt-8 hidden sm:block">
      <div className="inline-block min-w-full border border-gray-200 align-middle">
        <table className="min-w-full">
          <thead>
            <tr className="border-t border-gray-200">
              <th
                className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                <span className="lg:pl-2">Project</span>
              </th>
              <th
                className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Members
              </th>
              <th
                className="hidden border-b border-gray-200 bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 md:table-cell"
                scope="col"
              >
                Last updated
              </th>
              <th
                className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                scope="col"
              />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {inventories.map((project) => (
              <tr key={project.id}>
                <td className="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                  <div className="flex items-center space-x-3 lg:pl-2">
                    <div
                      className={classNames(
                        project.bgColorClass,
                        'flex-shrink-0 w-2.5 h-2.5 rounded-full'
                      )}
                      aria-hidden="true"
                    />
                    <a href="#" className="truncate hover:text-gray-600">
                      <span>
                        {project.title}{' '}
                        <span className="font-normal text-gray-500">
                          in {project.team}
                        </span>
                      </span>
                    </a>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="flex shrink-0 -space-x-1">
                      {project.members.map((member) => (
                        <img
                          key={member.handle}
                          className="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                          src={member.imageUrl}
                          alt={member.name}
                        />
                      ))}
                    </div>
                    {project.totalMembers > project.members.length ? (
                      <span className="shrink-0 text-xs font-medium leading-5">
                        +{project.totalMembers - project.members.length}
                      </span>
                    ) : null}
                  </div>
                </td>
                <td className="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                  {project.lastUpdated}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
