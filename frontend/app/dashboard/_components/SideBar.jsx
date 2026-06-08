"use client";
import React, { useContext, useState } from "react";
import {
  BookOpen, ChevronLeft, ChevronRight,
  Compass, Home, LogOut, Menu, Shield, X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { SubscriptionContext } from "@/app/_context/SubscriptionContext";

const MENU_ITEMS = [
  { id: 1, name: "Home",    icon: Home,    path: "/dashboard" },
  { id: 2, name: "Explore", icon: Compass, path: "/dashboard/explore" },
  { id: 3, name: "Upgrade", icon: Shield,  path: "/dashboard/upgrade" },
  { id: 4, name: "Logout",  icon: LogOut,  path: "/" },
];

function NavItem({ item, path, collapsed, onClick }) {
  const Icon = item.icon;
  const active = item.path === path;
  return (
    <li>
      <Link href={item.path} onClick={onClick} title={collapsed ? item.name : undefined}>
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer group border-l-2
          ${collapsed ? "justify-center" : ""}
          ${active
            ? "bg-primary/15 dark:bg-primary/25 border-blue-500 text-foreground"
            : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Icon className={`flex-shrink-0 h-[18px] w-[18px] transition-colors
            ${active ? "text-blue-500" : "text-muted-foreground group-hover:text-foreground"}`}
          />
          {!collapsed && (
            <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
          )}
        </div>
      </Link>
    </li>
  );
}

function QuotaSection({ quota, limit, collapsed }) {
  const unlimited = limit == null;
  const pct = unlimited ? 100 : Math.min((quota / limit) * 100, 100);
  const limitLabel = unlimited ? "∞" : limit;
  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-1 px-2">
        <div className="w-8 h-1.5 rounded-full bg-border overflow-hidden">
          <div
            className={`h-full rounded-full ${unlimited ? "bg-purple-500" : "bg-blue-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-[10px] text-muted-foreground">{quota}/{limitLabel}</span>
      </div>
    );
  }
  return (
    <div className="space-y-2 px-2">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>Course quota</span>
        <span className="text-foreground font-medium">{quota} / {limitLabel}</span>
      </div>
      <Progress value={pct} className="h-1.5" />
      <p className="text-xs text-muted-foreground text-center pt-1">
        {unlimited ? "Pro — unlimited generation" : "Upgrade for unlimited generation"}
      </p>
    </div>
  );
}

function SideBar({ collapsed, onToggle }) {
  const { userCourseList } = useContext(UserCourseListContext);
  const subCtx = useContext(SubscriptionContext);
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const quota = userCourseList?.length ?? 0;
  const isPro = subCtx?.subscription?.plan === "pro";
  const quotaLimit = isPro ? null : 15;

  const sidebarBase = "flex flex-col bg-background/90 dark:bg-black/50 backdrop-blur-xl border-r border-border";

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-all"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className={`absolute left-0 top-0 h-full w-64 ${sidebarBase} p-5 shadow-2xl`}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2.5">
                <BookOpen className="h-5 w-5 text-blue-500" />
                <span className="text-base font-semibold text-foreground tracking-tight">CourseGPT</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest px-2 mb-3">Menu</p>
            <ul className="space-y-1">
              {MENU_ITEMS.map(item => (
                <NavItem key={item.id} item={item} path={path} collapsed={false} onClick={() => setMobileOpen(false)} />
              ))}
            </ul>
            <div className="mt-auto pt-5 border-t border-border">
              <QuotaSection quota={quota} limit={quotaLimit} collapsed={false} />
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className={`fixed left-0 top-0 h-full hidden md:flex flex-col z-40 transition-all duration-300 ${sidebarBase} ${collapsed ? "w-16" : "w-64"}`}>
        {/* Logo */}
        <div className={`flex items-center p-4 border-b border-border ${collapsed ? "justify-center" : "gap-2.5 px-5"}`}>
          <BookOpen className="h-5 w-5 text-blue-500 flex-shrink-0" />
          {!collapsed && <span className="text-base font-semibold text-foreground tracking-tight">CourseGPT</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-hidden">
          {!collapsed && <p className="text-xs text-muted-foreground uppercase tracking-widest px-2 mb-3">Menu</p>}
          <ul className="space-y-1">
            {MENU_ITEMS.map(item => (
              <NavItem key={item.id} item={item} path={path} collapsed={collapsed} />
            ))}
          </ul>
        </nav>

        {/* Quota + collapse toggle */}
        <div className="p-3 border-t border-border space-y-3">
          <QuotaSection quota={quota} limit={quotaLimit} collapsed={collapsed} />
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-xs"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed
              ? <ChevronRight className="h-4 w-4" />
              : <><ChevronLeft className="h-4 w-4" /><span>Collapse</span></>
            }
          </button>
        </div>
      </div>
    </>
  );
}

export default SideBar;
