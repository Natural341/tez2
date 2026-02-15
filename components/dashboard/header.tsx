"use client"

import { User } from "next-auth"
import { Bell, Search, User as UserIcon, LogOut, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

interface HeaderProps {
  user?: User
}

export function Header({ user }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    {
      id: 1,
      title: "New analysis completed",
      message: "Your sales data analysis has been successfully completed",
      time: "5 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "Dataset uploaded",
      message: "Q4_data.csv uploaded successfully",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "Premium membership reminder",
      message: "Your trial expires in 7 days",
      time: "1 day ago",
      unread: false,
    },
  ]

  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-30">
      <div className="flex h-16 items-center gap-4 px-6">
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input
              placeholder="Search datasets..."
              className="border-zinc-200 pl-9 focus-visible:ring-blue-600"
            />
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 transition-colors hover:bg-zinc-100"
          >
            <Bell className="h-5 w-5 text-zinc-600" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-full z-20 mt-2 w-80 rounded-lg border border-zinc-200 bg-white shadow-xl">
                <div className="border-b border-zinc-200 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-zinc-900">Notifications</h3>
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
                      Mark all as read
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border-b border-zinc-100 p-4 transition-colors hover:bg-zinc-50 ${
                        notification.unread ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {notification.unread && (
                          <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-zinc-900">
                            {notification.title}
                          </p>
                          <p className="mt-1 text-xs text-zinc-600">
                            {notification.message}
                          </p>
                          <p className="mt-2 text-xs text-zinc-500">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-zinc-200 p-3">
                  <button className="w-full rounded-lg py-2 text-center text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-zinc-100"
          >
            <div className="text-right">
              <p className="text-sm font-semibold text-zinc-900">{user?.name || "User"}</p>
              <p className="text-xs text-zinc-500">{user?.email}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          </button>

          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-lg border border-zinc-200 bg-white shadow-xl">
                <div className="border-b border-zinc-200 p-4">
                  <p className="text-sm font-semibold text-zinc-900">{user?.name || "User"}</p>
                  <p className="text-xs text-zinc-500">{user?.email}</p>
                </div>
                <div className="p-2">
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={() => window.location.href = "/"}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
