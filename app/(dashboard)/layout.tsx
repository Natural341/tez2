import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { TrialBanner } from "@/components/dashboard/trial-banner"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = {
    id: "demo-user-id",
    name: "Demo Kullanıcı",
    email: "demo@example.com",
    image: null,
  };

  const userData = {
    trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    isPremium: false,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TrialBanner
          trialEndsAt={userData.trialEndsAt}
          isPremium={userData.isPremium}
        />
        <Header user={user} />
        <main className="flex-1 overflow-auto bg-white">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
