// ClientProvider.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store/store";
import { ToastContainer } from "react-toastify";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ToastContainer />
      {children}
    </Provider>
  );
}
