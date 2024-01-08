import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./style.scss";

export default function Navbar({ OpenSideBar }: { OpenSideBar: boolean }) {
  const currentRoute = usePathname();
  // console.log(currentRoute + "from navbar");
  const pathObj: NavKeyType = {
    Dynamic: [
      { name: "Dynamic Form", path: "/" },
      { name: "Dynamic Field", path: "/DynamicField" },
      { name: "Dynamic Table", path: "/DynamicTable" },
    ],
  };
  const CurrentView = pathObj[currentRoute.slice(1)] ?? [
    { name: "Plant", path: "/Masters" },
    { name: "General", path: "/Masters/General" },
    { name: "MRPData", path: "/Masters/MRPData" },
    // { name: "Sales & others", path: "/Masters/SalesAndOthers" },
  ];

  return (
    <div className={OpenSideBar ? "full-side-bar" : "side-bar"}>
      {OpenSideBar ? (
        <>
          <div className="header-part-sidebar">
            <TextField
              size="small"
              id="search-sidebar"
              variant="standard"
              placeholder="Search here"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#535353", marginTop: "15px" }} />
                  </InputAdornment>
                ),
                type: "search",
              }}
            />
          </div>
          <nav>
            <h2>Master</h2>
            <ul>
              {CurrentView.map((data: NavSinData) => (
                <li
                  key={data.path}
                  className={
                    (currentRoute === "/Masters" && data.name === "Plant") ||
                    currentRoute.split("/").includes(data.name)
                      ? "activ-sidebar-link"
                      : ""
                  }
                >
                  <Link href={data.path}>{data.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
