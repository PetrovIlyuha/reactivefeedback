import { useAuth } from "@/lib/auth"
import useSWR from "swr"

import EmptyState from "@/components/EmptyState"
import FreePlanEmptyState from "@/components/FreePlanEmptyState"
import SiteTableSkeleton from "@/components/table/SiteTableSkeleton"
import DashboardShell from "@/components/DashboardShell"
import fetcher from "../utils/fetcher"
import SiteTable from "@/components/table/SiteTable"

export default function Dashboard() {
  const auth = useAuth()
  const { data } = useSWR(
    auth.user ? ["/api/sites", auth.user.token] : null,
    fetcher
  )
  if (!data || !auth.user)
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  )
}
