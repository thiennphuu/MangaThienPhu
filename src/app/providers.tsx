"use client";

import type { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AuthProvider } from "../features/auth/AuthContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <AuthProvider>{children}</AuthProvider>
    </AntdRegistry>
  );
}
