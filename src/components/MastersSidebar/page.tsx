"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import { useContext } from "react";
import "./style.scss";

export default function MastersSidebar() {
  // const masterNavBar = {
  //   Plant: [
  //     { name: "Plant", path: "/Masters" },
  //     { name: "ProfitCenter", path: "/Masters/Plant/ProfitCenter" },
  //     { name: "StorageLocation", path: "/Masters/Plant/StorageLocation" },
  //     { name: "StorageBin", path: "/Masters/Plant/StorageBin" },
  //     { name: "ValuationCategory", path: "/Masters/Plant/ValuationCategory" },
  //     { name: "PriceControl", path: "/Masters/Plant/PriceControl" },
  //     { name: "VarienceKey", path: "/Masters/Plant/VarienceKey" },
  //     { name: "Department", path: "/Masters/Plant/Department" },
  //   ],
  //   General: [
  //     { name: "IndustrySector", path: "/Masters/General" },
  //     { name: "MaterialType", path: "/Masters/General/MaterialType" },
  //     { name: "BaseUOP", path: "/Masters/General/BaseUOP" },
  //     { name: "UnitOfIssue", path: "/Masters/General/UnitOfIssue" },
  //     { name: "AlternateUOM", path: "/Masters/General/AlternateUOM" },
  //     { name: "InspectionCode", path: "/Masters/General/InspectionCode" },
  //     { name: "Division", path: "/Masters/General/Division" },
  //     { name: "SalesUnit", path: "/Masters/General/SalesUnit" },
  //   ],
  //   MRPData: [
  //     { name: "MRPType", path: "/Masters/MRPData" },
  //     { name: "MRPController", path: "/Masters/MRPData/MRPController" },
  //     { name: "LOTSize", path: "/Masters/MRPData/LOTSize" },
  //     { name: "ProcuremenType", path: "/Masters/MRPData/ProcuremenType" },
  //     { name: "PlanningStrgyGrp", path: "/Masters/MRPData/PlanningStrgyGrp" },
  //     { name: "AvailCheck", path: "/Masters/MRPData/AvailCheck" },
  //     { name: "ScheduleMargin", path: "/Masters/MRPData/ScheduleMargin" },
  //   ],
  // };

  // const currentRoute = usePathname();

  // const crtPathName = currentRoute === "/Masters" ? "Plant" : currentRoute;
  // const ExactNameForRender = crtPathName
  //   .split("/")
  //   .filter((data) => data)
  //   .filter((data) => data !== "Masters")[0];
  // const CurrentViewList =
  //   masterNavBar[ExactNameForRender as keyof MasterNavBarDataRenderTypes];

  const CntxData = useContext(UseContextHook);
  const { masters, SelectedMasterDatatab, setSelectedMasterDatatab } = CntxData;
  if (!setSelectedMasterDatatab) {
    return null; // or some other fallback or loading state
  }

  return (
    <nav className="masters-sidenavbar-class">
      <p>{SelectedMasterDatatab}</p>
      <ul>
        {Object.keys(masters).map((data: string) => (
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
