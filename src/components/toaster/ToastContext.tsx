import type { ReactNode } from 'react';
import React, { createContext, useContext, useReducer } from 'react';

import type { ToasterTypeEnum } from './toasterEnum';
import { ToasterActionsEnum } from './toasterEnum';

const defaultContext: StateType = {
  toasts: [],
};

const dispatchDefault: React.Dispatch<ActionType> = () => null;

const ToastStateContext = createContext(defaultContext);
const ToastDispatchContext = createContext(dispatchDefault);

type ActionType = {
  type: ToasterActionsEnum.ADD_TOAST | ToasterActionsEnum.DELETE_TOAST;
  toast?: ToastType;
  id: string;
};

export type ToastType = {
  type: ToasterTypeEnum.ERROR | ToasterTypeEnum.SUCCESS | ToasterTypeEnum.INFO;
  message: string;
  id: string;
};

type StateType = {
  toasts: ToastType[];
};

function ToastReducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case ToasterActionsEnum.ADD_TOAST: {
      return {
        ...state,
        toasts: [...state.toasts, action.toast].filter((toast) => toast),
      };
    }
    case ToasterActionsEnum.DELETE_TOAST: {
      const updatedToasts = state.toasts
        .filter((toast) => toast.id !== action.id)
        .filter((toast) => toast);
      return {
        ...state,
        toasts: updatedToasts,
      };
    }
    default: {
      throw new Error(`unhandled action ${action}`);
    }
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  // @ts-ignore
  const [state, dispatch] = useReducer(ToastReducer, {
    toasts: [],
  });

  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
}

export const useToastStateContext = () => useContext(ToastStateContext);
export const useToastDispatchContext = () => useContext(ToastDispatchContext);
