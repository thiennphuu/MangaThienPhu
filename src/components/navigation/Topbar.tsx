import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "../ui/Input";

export function Topbar({ pageName, query, onQueryChange }: { pageName: string; query: string; onQueryChange: (value: string) => void }) {
  return <header className="topbar"><div className="breadcrumbs">Workspace <b>/</b> <strong>{pageName}</strong></div><div className="top-actions"><div className="top-search"><SearchOutlined /><Input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search titles, authors, genres..." /><span>⌘ K</span></div><button className="icon-button" aria-label="Notifications"><BellOutlined /></button></div></header>;
}
