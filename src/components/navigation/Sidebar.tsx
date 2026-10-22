"use client";

import { AppstoreOutlined, BookOutlined, DashboardOutlined, HistoryOutlined, PlusOutlined, SettingOutlined, TagOutlined, ThunderboltFilled } from "@ant-design/icons";
import type { ViewName } from "../../types/common";
import { NavItem } from "./NavItem";

export function Sidebar({ view, onNavigate }: { view: ViewName; onNavigate: (view: ViewName) => void }) {
  const items: Array<[string, ViewName, React.ReactNode]> = [["Overview", "overview", <DashboardOutlined key="overview" />], ["Discover", "discover", <AppstoreOutlined key="discover" />], ["My library", "library", <BookOutlined key="library" />]];
  return <aside className="sidebar"><div className="logo"><b>m</b><strong>mangahub</strong></div><p className="sidebar-label">Your reading room</p><nav>{items.map(([label, itemView, icon]) => <NavItem key={itemView} label={label} view={itemView} icon={icon} active={view === itemView} onNavigate={onNavigate} />)}<NavItem label="Bookmarks" view="overview" icon={<TagOutlined />} active={false} onNavigate={onNavigate} /><NavItem label="Reading history" view="overview" icon={<HistoryOutlined />} active={false} onNavigate={onNavigate} /></nav><div className="sidebar-spacer" /><div className="sidebar-note"><ThunderboltFilled /><strong>One more chapter.<br />A whole new world.</strong><small>Your quiet corner of the manga universe.</small></div><button className="settings"><SettingOutlined /> Settings & preferences</button><div className="profile"><b>AK</b><span>Alex Kim<small>Chapter chaser</small></span><PlusOutlined /></div></aside>;
}
