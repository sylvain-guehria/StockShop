import { v4 as uuidV4 } from 'uuid';

import { useToastDispatchContext } from '@/components/08-toaster/ToastContext';
import type { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import { ToasterActionsEnum } from '@/components/08-toaster/toasterEnum';

export function useToast(delay: number) {
  const dispatch = useToastDispatchContext();

  function toast(
    type: ToasterTypeEnum.ERROR | ToasterTypeEnum.SUCCESS,
    message: string
  ) {
    const id = uuidV4();
    const id2 = uuidV4();
    dispatch({
      id: id2,
      type: ToasterActionsEnum.ADD_TOAST,
      toast: {
        type,
        message,
        id,
      },
    });

    setTimeout(() => {
      dispatch({ type: ToasterActionsEnum.DELETE_TOAST, id });
    }, delay);
  }

  return toast;
}
