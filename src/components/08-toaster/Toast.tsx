import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';

import { classNames } from '@/utils/tailwindUtils';

import type { ToastType } from './ToastContext';
import { useToastDispatchContext } from './ToastContext';
import { ToasterActionsEnum, ToasterTypeEnum } from './toasterEnum';

export default function Toast({ type, message, id }: ToastType) {
  const dispatch = useToastDispatchContext();
  // see => https://tailwindui.com/components/application-ui/overlays/notifications
  return (
    <div className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
      <div className="flex w-full flex-col items-center space-y-4">
        <div
          className={classNames(
            'm-3 rounded-md bg-green-50 p-4',
            type === ToasterTypeEnum.SUCCESS ? 'bg-green-50' : '',
            type === ToasterTypeEnum.ERROR ? 'bg-red-50' : '',
            type === ToasterTypeEnum.INFO ? 'bg-blue-50' : ''
          )}
        >
          <div className="flex">
            <div className="shrink-0">
              <CheckCircleIcon
                className={classNames(
                  'h-5 w-5',
                  type === ToasterTypeEnum.SUCCESS ? 'text-green-400' : '',
                  type === ToasterTypeEnum.ERROR ? 'text-red-400' : '',
                  type === ToasterTypeEnum.INFO ? 'text-blue-400' : ''
                )}
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p
                className={classNames(
                  'text-sm font-medium',
                  type === ToasterTypeEnum.SUCCESS ? 'text-green-800' : '',
                  type === ToasterTypeEnum.ERROR ? 'text-red-800' : '',
                  type === ToasterTypeEnum.INFO ? 'text-blue-800' : ''
                )}
              >
                {message}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-m-1.5">
                <button
                  onClick={() => {
                    dispatch({ type: ToasterActionsEnum.DELETE_TOAST, id });
                  }}
                  className={classNames(
                    'inline-flex rounded-md focus:outline-none  focus:ring-offset-2',
                    type === ToasterTypeEnum.SUCCESS
                      ? 'bg-green-50 text-green-500, hover:bg-green-100,  focus:ring-green-600 focus:ring-offset-green-50'
                      : '',
                    type === ToasterTypeEnum.ERROR
                      ? 'bg-red-50 p-1.5 text-red-500 hover:bg-red-100  focus:ring-red-600 focus:ring-offset-red-50'
                      : '',
                    type === ToasterTypeEnum.INFO
                      ? 'bg-blue-50 p-1.5 text-blue-500 hover:bg-blue-100  focus:ring-blue-600 focus:ring-offset-blue-50'
                      : ''
                  )}
                >
                  <span className="sr-only">Dismiss</span>

                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* {type === ToasterTypeEnum.ERROR && (
          <div className="m-3 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="shrink-0">
                <XCircleIcon
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{message}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-m-1.5">
                  <button
                    onClick={() => {
                      dispatch({ type: ToasterActionsEnum.DELETE_TOAST, id });
                    }}
                    className="inline-flex rounded-md "
                  >
                    <span className="sr-only">Dismiss</span>

                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
