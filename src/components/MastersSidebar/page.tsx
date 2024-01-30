"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { mastersProps } from "../../../TypesStore";
import "./style.scss";

export default function MastersSidebar() {
  const CntxData = useContext(UseContextHook);
  const {
    masters,
    SelectedMasterDatatab,
    setSelectedMasterDatatab,
    settabValue,
  } = CntxData;
  const auth = UseAuth();
  const pathName = usePathname();
  const ExactPath = pathName
    .split("/")
    .filter((n) => n)
    .filter((n) => n !== "Masters");
  if (!auth) {
    return null;
  }
  if (!setSelectedMasterDatatab || !SelectedMasterDatatab || !settabValue) {
    return null; // or some other fallback or loading state
  }
  return (
    <nav className="masters-sidenavbar-class">
      <p>{SelectedMasterDatatab}</p>
      <ul>
        {Object.keys(
          masters[
            (ExactPath.length > 0
              ? ExactPath
              : ["Plant"])[0] as keyof mastersProps
          ]
        )?.map((data: string) => (
          <li
            key={data}
            className={
              SelectedMasterDatatab === data ? "active-second-bar-li-class" : ""
            }
            onClick={() => {
              setSelectedMasterDatatab(data);
              settabValue("table");
            }}
          >
            {data}
          </li>
        ))}
      </ul>
    </nav>
  );
}
