import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "../../../components/ui/Input";

export function LibraryFilters({ query, onQueryChange }: { query: string; onQueryChange: (value: string) => void }) {
  return <><div className="library-toolbar"><div className="library-search"><SearchOutlined /><Input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search your library..." /></div><button className="sort-button">Last read <DownOutlined /></button></div><div className="library-tabs">{["All", "Reading", "Completed", "Plan to read", "On hold", "Dropped"].map((tab, index) => <button className={index === 0 ? "selected" : ""} key={tab}>{tab}</button>)}</div></>;
}
