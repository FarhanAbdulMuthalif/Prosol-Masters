"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import { useContext } from "react";
import "./style.scss";

export default function MastersSidebar() {
  const CntxData = useContext(UseContextHook);
  const { masters, SelectedMasterDatatab, setSelectedMasterDatatab } = CntxData;
  const auth = UseAuth();
  if (!auth) {
    return null;
  }
  if (!setSelectedMasterDatatab || !SelectedMasterDatatab) {
    return null; // or some other fallback or loading state
  }

  return (
    <nav className="masters-sidenavbar-class">
      <p>{SelectedMasterDatatab}</p>
      <ul>
        {Object.keys(masters["Plant"]).map((data: string) => (
          <li
            key={data}
            className={
              SelectedMasterDatatab === data ? "active-second-bar-li-class" : ""
            }
            onClick={() => {
              setSelectedMasterDatatab(data);
            }}
          >
            {data}
          </li>
        ))}
      </ul>
    </nav>
  );
}
