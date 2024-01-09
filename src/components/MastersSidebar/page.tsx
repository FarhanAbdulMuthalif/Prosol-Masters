"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./style.scss";

export default function MastersSidebar() {
  const masterNavBar = {
    Plant: [
      { name: "Plant", path: "/Masters" },
      { name: "ProfitCenter", path: "/Masters/Plant/ProfitCenter" },
      { name: "StorageLocation", path: "/Masters/Plant/StorageLocation" },
      { name: "StorageBin", path: "/Masters/Plant/StorageBin" },
      { name: "ValuationCategory", path: "/Masters/Plant/ValuationCategory" },
      { name: "PriceControl", path: "/Masters/Plant/PriceControl" },
      { name: "VarienceKey", path: "/Masters/Plant/VarienceKey" },
      { name: "Department", path: "/Masters/Plant/Department" },
    ],
    General: [
      { name: "IndustrySector", path: "/Masters/General" },
      { name: "MaterialType", path: "/Masters/General/MaterialType" },
      { name: "BaseUOP", path: "/Masters/General/BaseUOP" },
      { name: "UnitOfIssue", path: "/Masters/General/UnitOfIssue" },
      { name: "AlternateUOM", path: "/Masters/General/AlternateUOM" },
      { name: "InspectionCode", path: "/Masters/General/InspectionCode" },
      { name: "Division", path: "/Masters/General/Division" },
      { name: "SalesUnit", path: "/Masters/General/SalesUnit" },
    ],
    MRPData: [
      { name: "MRPType", path: "/Masters/MRPData" },
      { name: "MRPController", path: "/Masters/MRPData/MRPController" },
      { name: "LOTSize", path: "/Masters/MRPData/LOTSize" },
      { name: "ProcuremenType", path: "/Masters/MRPData/ProcuremenType" },
      { name: "PlanningStrgyGrp", path: "/Masters/MRPData/PlanningStrgyGrp" },
      { name: "AvailCheck", path: "/Masters/MRPData/AvailCheck" },
      { name: "ScheduleMargin", path: "/Masters/MRPData/ScheduleMargin" },
    ],
  };

  const currentRoute = usePathname();

  const crtPathName = currentRoute === "/Masters" ? "Plant" : currentRoute;
  const ExactNameForRender = crtPathName
    .split("/")
    .filter((data) => data)
    .filter((data) => data !== "Masters")[0];
  const CurrentViewList =
    masterNavBar[ExactNameForRender as keyof MasterNavBarDataRenderTypes];
  // console.log(currentRoute);
  // console.log(ExactNameForRender);
  return (
    <nav className="masters-sidenavbar-class">
      <p>{ExactNameForRender}</p>
      <ul>
        {CurrentViewList?.map((data: subSecondNavbarType) => (
          <li
            key={data.name}
            className={
              currentRoute === data.path ? "active-second-bar-li-class" : ""
            }
          >
            <Link href={data.path}>{data.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
