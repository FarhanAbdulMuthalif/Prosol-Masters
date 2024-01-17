"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import MastersSidebar from "@/components/MastersSidebar/page";
import { useContext } from "react";

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mastersData = useContext(UseContextHook);
  const { auth } = mastersData;

  return (
    <section className="masters-layout-section">
      {auth ? (
        <>
          <MastersSidebar />
          {children}
        </>
      ) : (
        <>{children}</>
      )}
    </section>
  );
}
