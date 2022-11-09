import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';

import type { ToastType } from './ToastContext';
import { useToastDispatchContext } from './ToastContext';
import { ToasterActionsEnum, ToasterTypeEnum } from './toasterEnum';

export default function Toast({ type, message, id }: ToastType) {
  const dispatch = useToastDispatchContext();
  // see => https://tailwindui.com/components/application-ui/overlays/notifications
  return (
    <div className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
      <div className="flex w-full flex-col items-center space-y-4">
        {type === ToasterTypeEnum.SUCCESS && (
          <div className="m-3 rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="shrink-0">
                <CheckCircleIcon
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{message}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-m-1.5">
                  <button
                    onClick={() => {
                      dispatch({ type: ToasterActionsEnum.DELETE_TOAST, id });
                    }}
                    className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  >
                    <span className="sr-only">Dismiss</span>

                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {type === ToasterTypeEnum.ERROR && (
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
                    className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  >
                    <span className="sr-only">Dismiss</span>

                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
