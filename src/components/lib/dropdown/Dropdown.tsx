import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';
import React, { Fragment } from 'react';

import { classNames } from '@/utils/tailwindUtils';

type Props = {
  iconClassName?: string;
  Icon?: (
    props: React.ComponentProps<'svg'> & { title?: string; titleId?: string }
  ) => JSX.Element;
  childrens: {
    key: string;
    render: JSX.Element;
  }[];
  label?: string;
};

const Dropdown: FC<Props> = ({
  iconClassName,
  childrens = [],
  label,
  Icon = EllipsisVerticalIcon,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="mr-1 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary-100 py-2 px-4 text-base font-medium text-primary-600 hover:bg-primary-200">
          <span className="sr-only">Open options</span>
          <div>{label}</div>
          {
            <Icon
              className={classNames(
                'h-7 w-7 shrink-0 text-primary-500 hover:bg-primary-300 rounded-full  ml-3',
                iconClassName || ''
              )}
              aria-hidden="true"
            />
          }
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            {childrens.map((child, index) => (
              <Menu.Item key={index}>
                <div className="hover:bg-primary-200">{child.render}</div>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
