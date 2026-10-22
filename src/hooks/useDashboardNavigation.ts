import { useState } from "react";
import type { ViewName } from "../types/common";

export function useDashboardNavigation() {
  const [view, setView] = useState<ViewName>("overview");
  return { view, openView: setView };
}
