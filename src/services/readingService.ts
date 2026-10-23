import type { ReadingActivity, ReadingProgress, LibraryManga } from "../types/common";
import { apiClient } from "./apiClient";

export const readingService = {
  getContinue: () => apiClient<LibraryManga[]>("/api/reading-progress/continue"),
  getActivity: () => apiClient<ReadingActivity>("/api/reading-activity"),
  updateProgress: (progress: Omit<ReadingProgress, "lastReadAt">) =>
    apiClient<ReadingProgress>("/api/reading-progress", {
      method: "PUT",
      body: JSON.stringify(progress),
    }),
};
