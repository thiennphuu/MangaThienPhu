"use client";

import type { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export function Providers({ children }: { children: ReactNode }) {
  return <AntdRegistry>{children}</AntdRegistry>;
}
