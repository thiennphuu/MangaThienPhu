import { useCallback } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useApiResource } from "../../../hooks/useApiResource";
import { libraryService } from "../../../services/libraryService";

export function useLibrary(query: string) {
  const debouncedQuery = useDebounce(query);
  const loader = useCallback(() => libraryService.getMine({ search: debouncedQuery }), [debouncedQuery]);
  return useApiResource(loader);
}
