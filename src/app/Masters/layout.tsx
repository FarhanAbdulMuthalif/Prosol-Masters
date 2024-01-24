"use client";
import MastersSidebar from "@/components/MastersSidebar/page";

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="masters-layout-section">
      <MastersSidebar />
      {children}
    </section>
  );
}
