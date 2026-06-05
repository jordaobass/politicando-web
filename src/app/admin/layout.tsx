import type { ReactNode } from "react";
import { TriangleAlertIcon } from "lucide-react";

import { SidebarAdmin } from "@/components/admin/sidebar-admin";

/** Layout do painel administrativo com sidebar própria. */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 flex-col md:flex-row">
      <SidebarAdmin />
      <div className="flex-1">
        <div className="flex items-center justify-center gap-2 bg-accent px-4 py-1.5 text-center text-xs text-accent-foreground">
          <TriangleAlertIcon className="size-3.5 shrink-0" aria-hidden="true" />
          Protótipo — painel administrativo para demonstração.
        </div>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
