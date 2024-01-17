"use client";

import { UseContextHook } from "@/Provides/UseContextHook";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Home() {
  const router = useRouter();
  const MasterDetails = useContext(UseContextHook);
  const { auth } = MasterDetails;

  if (!auth) {
    return router.push("/Login");
  }
  return <main>Hello</main>;
}
