"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Database,
  BarChart3,
  Settings,
  LogOut,
  Terminal,
  SlidersHorizontal,
  FileText,
  MessageSquareText,
  LineChart,
} from "lucide-react"
import { signOut } from "next-auth/react"

const menuItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Data Sources",
    href: "/dashboard/datasets",
    icon: Database,
  },
  {
    title: "SQL Studio",
    href: "/dashboard/sql-studio",
    icon: Terminal,
  },
  {
    title: "Simulation",
    href: "/dashboard/simulation",
    icon: SlidersHorizontal,
  },
  {
    title: "Live Analysis",
    href: "/dashboard/live-analysis",
    icon: LineChart,
  },
  {
    title: "Analyses",
    href: "/dashboard/analyses",
    icon: BarChart3,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "AI Assistant",
    href: "/dashboard/chat",
    icon: MessageSquareText,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 p-6 bg-white">
        <Link href="/" className="flex items-center gap-3 transition-all hover:scale-105">
          <img src="/logo.png" alt="InsightFlow" className="h-10 w-auto drop-shadow-sm" />
          <div>
            <h1 className="text-xl font-bold text-zinc-900">
              Insight<span className="text-blue-600">Flow</span>
            </h1>
            <p className="text-xs text-zinc-500">Data Analytics</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-zinc-200 p-3">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}
