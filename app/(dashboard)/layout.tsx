'use client'
import DashboardPanelLayout from '@/core/layout/content/dashboard-layout'

import { subscribeUserToPush } from '@/lib/pushNotifications'

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  subscribeUserToPush()
  return (
    <DashboardPanelLayout>
      <div>{children}</div>
    </DashboardPanelLayout>
  )
}
