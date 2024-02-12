import { UseContextHook } from "@/Provides/UseContextHook";
import { pathObj } from "@/utils/LinkData";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { PathObjProps } from "../../../TypesStore";
import "./style.scss";

export default function Navbar({ OpenSideBar }: { OpenSideBar: boolean }) {
  const currentRoute = usePathname();
  // console.log(currentRoute + "from navbar");
  const { auth } = useContext(UseContextHook);
  if (!auth) {
    return null;
  }
  const CurrentView =
    pathObj[
      currentRoute.split("/").filter((n) => n)[0] as keyof PathObjProps
    ] ?? [];
  const NamewithMatch = (
    currentRoute.split("/").filter((n) => n).length === 0
      ? "Dashbord"
      : currentRoute.split("/").filter((n) => n)[0]
  )
    ?.replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space between lowercase and uppercase letters
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // Insert space between consecutive uppercase letters and lowercase letters
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
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
            <h2>{NamewithMatch}</h2>
            <ul>
              {CurrentView.map((data: Record<string, string>) => (
                <li
                  key={data.path}
                  className={
                    /* (currentRoute === "/Masters" && data.name === "Plant") || */
                    currentRoute === data.path ? "activ-sidebar-link" : ""
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
