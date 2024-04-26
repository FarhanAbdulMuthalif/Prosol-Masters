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
  const ExactPathArr = pathName
    .split("/")
    .filter((n) => n)
    .filter((n) => n !== "Masters");
  const ExactPath = (
    ExactPathArr.length > 0 ? ExactPathArr : ["Plant"]
  )[0] as keyof mastersProps;

  if (
    !auth ||
    !setSelectedMasterDatatab ||
    !SelectedMasterDatatab ||
    !settabValue
  ) {
    return null; // or some other fallback or loading state
  }
  const selectedMasterData =
    masters[
      (ExactPathArr.length === 0
        ? "Plant"
        : ExactPathArr[0]) as keyof mastersProps
    ];
  // console.log(typeof ExactPath);
  if (!selectedMasterData) {
    return null; // or handle the case where selectedMasterData is undefined
  }
  return (
    <>
      {ExactPath !== "Vendor" &&
      ExactPath !== "Attribute" &&
      ExactPath !== "CreateDictionary" &&
      ExactPath !== "Value" ? (
        <nav className="masters-sidenavbar-class">
          <p>{SelectedMasterDatatab}</p>
          <ul>
            {Object.keys(selectedMasterData)?.map((data: string) => (
              <li
                key={data}
                className={
                  SelectedMasterDatatab === data
                    ? "active-second-bar-li-class"
                    : ""
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
      ) : (
        ""
      )}
    </>
  );
}
