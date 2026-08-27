import type { ReactNode } from "react";

import { SidebarAdmin } from "@/components/admin/sidebar-admin";

/** Layout do painel administrativo com sidebar própria. */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 flex-col md:flex-row">
      <SidebarAdmin />
      <div className="flex-1">
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
