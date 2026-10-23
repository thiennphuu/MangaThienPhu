export type ViewName = "overview" | "discover" | "library" | "reader";

export type Manga = {
  id: string;
  title: string;
  description?: string;
  genres: string[];
  totalChapters: number;
  coverUrl: string;
  rating?: number;
};

export type ReadingProgress = {
  mangaId: string;
  currentChapter: number;
  currentPage: number;
  progressPercent: number;
  lastReadAt: string;
};

export type LibraryStatus =
  | "reading"
  | "completed"
  | "plan_to_read"
  | "on_hold"
  | "dropped";

export type LibraryManga = Manga & {
  status: LibraryStatus;
  progress: ReadingProgress;
};

export type ReadingActivity = {
  streakDays: number;
  chaptersThisWeek: number;
  readingTimeMinutes: number;
  completedThisMonth: number;
};

export type LibraryResponse = {
  items: LibraryManga[];
  total: number;
  stats: {
    titles: number;
    reading: number;
    completed: number;
    planToRead: number;
  };
};

export type MangaListResponse = {
  items: Manga[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
