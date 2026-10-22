import { useMemo } from "react";
import { useDebounce } from "../../../hooks/useDebounce";

export function useLibrary(query: string) {
  return useMemo(() => useDebounce(query).trim().toLowerCase(), [query]);
}
