import { toast } from "sonner";

// ----------------------------------------------------------------------

type ToastOptions = {
  className?: string;
  duration?: number;
};

export function useToast() {
  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      className: options?.className || "soft-color",
      duration: options?.duration || 3000,
    });
  };

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      className: options?.className || "soft-color",
      duration: options?.duration || 3000,
    });
  };

  const showInfo = (message: string, options?: ToastOptions) => {
    toast.info(message, {
      className: options?.className || "soft-color",
      duration: options?.duration || 3000,
    });
  };

  const showWarning = (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      className: options?.className || "soft-color",
      duration: options?.duration || 3000,
    });
  };

  const showPromise = <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options?: ToastOptions
  ) => {
    toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
      className: options?.className || "soft-color",
      duration: options?.duration,
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showPromise,
  };
}
