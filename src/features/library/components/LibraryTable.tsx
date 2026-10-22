import { EyeOutlined } from "@ant-design/icons";
import { MangaCover } from "../../../components/manga/MangaCover";
import { ReadingProgress } from "./ReadingProgress";

const rows = [["The Last Ronin", "Reading", 62], ["Orbit / Zero", "Reading", 35], ["Paper Kingdom", "Plan to read", 21], ["Tokyo After Dark", "Reading", 18], ["Ghost Signal", "Completed", 0]] as const;

export function LibraryTable() {
  return <section className="library-table"><div className="library-table-head"><span>Title</span><span>Status</span><span>Progress</span><span>Last read</span><span>Action</span></div>{rows.map(([title, status, progress], index) => <article className="library-row" key={title}><div className="library-title"><MangaCover title={title} image={`https://images.unsplash.com/${["photo-1518709268805-4e9042af9f23", "photo-1614728894747-a83421e2b9c9", "photo-1534447677768-be436bb09401", "photo-1519608487953-e999c86e7455", "photo-1500534623283-312aade485b7"][index]}?auto=format&fit=crop&w=200&q=85`} /><strong>{title}</strong></div><span className={`status status-${status.replaceAll(" ", "-").toLowerCase()}`}>{status}</span><ReadingProgress value={progress} /><span className="last-read">Oct {12 - index}, 2026<small>10:42 PM</small></span><button className="continue-button">{status === "Completed" ? <><EyeOutlined /> View</> : "▷ Continue"}</button></article>)}</section>;
}
