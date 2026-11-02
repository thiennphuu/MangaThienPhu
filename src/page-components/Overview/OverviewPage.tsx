import { RightOutlined, ThunderboltFilled } from "@ant-design/icons";
import { useCallback, useMemo } from "react";
import { MangaCard } from "../../components/manga/MangaCard";
import { ResourceState } from "../../components/ui/ResourceState";
import { useApiResource } from "../../hooks/useApiResource";
import { mangaService } from "../../services/mangaService";
import { readingService } from "../../services/readingService";
import type { Manga } from "../../types/common";

export function OverviewPage({ onStartReading = () => {}, onOpenLibrary = () => {} }: { onStartReading?: (manga: Manga) => void; onOpenLibrary?: () => void }) {
  const featuredLoader = useCallback(() => mangaService.getFeatured(), []);
  const continueLoader = useCallback(() => readingService.getContinue(), []);
  const activityLoader = useCallback(() => readingService.getActivity(), []);
  const featured = useApiResource(featuredLoader);
  const continued = useApiResource(continueLoader);
  const activity = useApiResource(activityLoader);
  const continueItems = useMemo(() => continued.data ?? [], [continued.data]);
  return <div className="content-wrap"><div className="welcome-row"><div><p className="eyebrow">Your daily escape</p><h1>The next chapter is yours, Alex.</h1><p className="subtitle">Pick up where you left off. There&apos;s a whole world waiting.</p></div><span className="streak"><ThunderboltFilled /> {activity.data?.streakDays ?? "—"}-day streak</span></div><section className="spotlight"><ResourceState loading={featured.loading} error={featured.error} empty={!featured.data} />{featured.data && <div><p className="eyebrow">Tonight&apos;s spotlight</p><h2>{featured.data.title}</h2><p>{featured.data.description ?? "Discover a new world and follow the signal into the unknown."}</p><p className="spotlight-meta">{featured.data.genres.join(" · ")} · {featured.data.totalChapters} chapters</p><button className="primary-button" onClick={() => onStartReading(featured.data!)}>Start reading <RightOutlined /></button></div>}</section><div className="section-heading"><h2>Continue reading</h2><button className="section-link" onClick={onOpenLibrary}>Your library →</button></div><ResourceState loading={continued.loading} error={continued.error} empty={!continueItems.length} /><div className="cover-grid">{continueItems.map((item) => <MangaCard key={item.id} manga={item} onContinue={() => onStartReading(item)} />)}</div><section className="reading-activity"><div><p className="eyebrow">Reading activity</p><h2>Your reading rhythm</h2><p className="activity-copy">Keep your momentum going with a little reading every day.</p></div><ResourceState loading={activity.loading} error={activity.error} empty={!activity.data} />{activity.data && <div className="activity-stats"><div><strong>{activity.data.streakDays}</strong><span>day streak</span></div><div><strong>{activity.data.chaptersThisWeek}</strong><span>chapters this week</span></div><div><strong>{(activity.data.readingTimeMinutes / 60).toFixed(1)}h</strong><span>reading time</span></div></div>}</section></div>;
}

export default OverviewPage;
