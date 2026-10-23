import { EyeOutlined } from "@ant-design/icons";
import { MangaCover } from "../../../components/manga/MangaCover";
import { ReadingProgress } from "./ReadingProgress";
import type { LibraryManga } from "../../../types/common";

export function LibraryTable({ items }: { items: LibraryManga[] }) {
  return <section className="library-table"><div className="library-table-head"><span>Title</span><span>Status</span><span>Progress</span><span>Last read</span><span>Action</span></div>{items.map((item) => <article className="library-row" key={item.id}><div className="library-title"><MangaCover title={item.title} image={item.coverUrl} /><strong>{item.title}</strong></div><span className={`status status-${item.status.replaceAll("_", "-")}`}>{item.status.replaceAll("_", " ")}</span><ReadingProgress value={item.progress.progressPercent} /><span className="last-read">{new Date(item.progress.lastReadAt).toLocaleDateString()}<small>{item.progress.currentChapter}/{item.totalChapters} chapters</small></span><button className="continue-button">{item.status === "completed" ? <><EyeOutlined /> View</> : "▷ Continue"}</button></article>)}</section>;
}
