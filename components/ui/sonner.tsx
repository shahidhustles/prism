"use client";

import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="system"
      className="toaster group"
      richColors
      closeButton
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "backdrop-blur-xl bg-white/10 dark:bg-black/30 border border-white/20 text-[#F8F8F8] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)] rounded-lg shadow-lg p-4",
          description: "text-[#D1D1D1] mt-2 text-sm",
          actionButton:
            "bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md transition-colors shadow-sm",
          cancelButton:
            "hover:bg-white/5 text-white/80 px-3 py-1 rounded-md transition-colors",
          title: "text-white font-medium",
          error: "!bg-black/40 border-red-500/50",
        },
        duration: 10000,
      }}
      {...props}
    />
  );
};

export { Toaster };
