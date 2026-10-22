import { ArrowLeftOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { Manga } from "../../types/common";
import { MangaCover } from "../../components/manga/MangaCover";
import { featuredManga } from "../../features/dashboard/dashboard-data";

export function ReaderPage({ manga = featuredManga, onBack = () => {} }: { manga?: Manga; onBack?: () => void }) {
  const currentChapter = manga.currentChapter ?? 1;
  const currentPage = manga.currentPage ?? 1;
  return <div className="reader-page"><button className="reader-back" onClick={onBack}><ArrowLeftOutlined /> Back to overview</button><div className="reader-heading"><div><p className="eyebrow">Now reading</p><h1>{manga.title}</h1><p className="subtitle">Chapter {currentChapter} · Resume from your last saved page</p></div><MangaCover title={manga.title} image={manga.image} /></div><section className="reader-canvas"><span>Chapter {currentChapter}</span><h2>{manga.title}</h2><p>Resuming from page {currentPage}.</p><small>Your reading position will be saved automatically.</small></section><div className="reader-controls"><button disabled><LeftOutlined /> Previous</button><span>Page {currentPage} / 24</span><button>Next <RightOutlined /></button></div></div>;
}

export default ReaderPage;
