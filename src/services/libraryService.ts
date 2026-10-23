import type { LibraryResponse } from "../types/common";
import { apiClient, buildQuery } from "./apiClient";

export const libraryService = {
  getMine: (params?: { status?: string; search?: string }) =>
    apiClient<LibraryResponse>(`/api/library${buildQuery(params ?? {})}`),
};
