"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Home() {
  const router = useRouter();
  const MasterDetails = useContext(UseContextHook);
  const auth = UseAuth();
  if (!auth) {
    return null;
  }
  return <main>Hello</main>;
}
