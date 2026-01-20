import { AdminLayoutWrapper } from "@/components/admin/AdminLayout";
import { canAccessAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const hasAccess = await canAccessAdmin();

    // Strict RBAC Check
    if (!hasAccess) {
        redirect('/'); // Or a specialized unauthorized page
    }

    return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
