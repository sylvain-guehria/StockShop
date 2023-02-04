import Toast from './Toast';
import type { ToastType } from './ToastContext';
import { useToastStateContext } from './ToastContext';

export default function ToastContainer() {
  const { toasts } = useToastStateContext();

  return (
    <div className="absolute top-10 z-50 w-full">
      <div className="mx-auto max-w-xl">
        {toasts &&
          toasts.map((toast: ToastType) => (
            <Toast
              id={toast.id}
              key={toast.id}
              type={toast.type}
              message={toast.message}
            />
          ))}
      </div>
    </div>
  );
}
