import { UseContextHook } from "@/Provides/UseContextHook";
import { pathObj } from "@/utils/LinkData";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, Popover, TextField } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { PathObjProps, mastersProps } from "../../../TypesStore";
import "./style.scss";

export default function Navbar({ OpenSideBar }: { OpenSideBar: boolean }) {
  const pathName = usePathname();
  const router = useRouter();
  // console.log(pathName + "from navbar");
  const [SecondSideBar, setSecondSideBar] = useState<HTMLLIElement | null>(
    null
  );
  const [SelectedData, setSelectedData] = useState({
    name: "Plant",
    path: "./Masters",
  });
  const {
    auth,
    masters,
    SelectedMasterDatatab,
    setSelectedMasterDatatab,
    settabValue,
    ThemeColor,
  } = useContext(UseContextHook);
  const open = Boolean(SecondSideBar);
  if (
    !auth ||
    !setSelectedMasterDatatab ||
    !SelectedMasterDatatab ||
    !settabValue
  ) {
    return null; // or some other fallback or loading state
  }
  const ExactPathArr = pathName.split("/").filter((n) => n);
  const CurrentView =
    pathObj[pathName.split("/").filter((n) => n)[0] as keyof PathObjProps] ??
    [];
  const NamewithMatch = (
    pathName.split("/").filter((n) => n).length === 0
      ? "Dashbord"
      : pathName.split("/").filter((n) => n)[0]
  )
    ?.replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space between lowercase and uppercase letters
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // Insert space between consecutive uppercase letters and lowercase letters
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word

  const selectedMasterData = masters[SelectedData.name as keyof mastersProps];
  const handleSecondBarClick = (
    event: React.MouseEvent<HTMLLIElement>,
    val: { name: string; path: string }
  ) => {
    event.stopPropagation(); // Stop the event from reaching the parent elements
    setSecondSideBar(event.currentTarget);
    if (
      val.name === "Vendor" ||
      val.name === "Attribute" ||
      val.name === "CreateTemplate" ||
      val.name === "Value"
    ) {
      setSecondSideBar(null);
    } else {
      setSelectedData(val);
    }
  };

  const handleSecondBarClose = () => {
    setSecondSideBar(null);
  };
  const noSecondBar = ["Vendor", "Attribute", "CreateTemplate", "Value"];
  const subListHandlerClick = (data: string) => {
    setSelectedMasterDatatab(data);
    settabValue("table");
    router.push(SelectedData.path);
    setSecondSideBar(null); // need to check
  };
  const listStyles = {
    // color: ThemeColor.primaryColor,
    borderLeft: `4px solid ${ThemeColor.primaryColor}`,
    backgroundColor: ThemeColor.tertiaryColor,
    color: ThemeColor.primaryColor,
  };
  const subListStyles = {
    // color: ThemeColor.primaryColor,
    backgroundColor: ThemeColor.primaryColor,
    // "&:hover": {
    //   backgroundColor: ThemeColor.primaryColor,
    // },
  };

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
              {CurrentView.map((data: { name: string; path: string }) => {
                // if (noSecondBar.includes(data.name)) {
                //   return (
                //     <Link
                //       href={data.path}
                //       key={data.name}
                //       className={
                //         pathName === data.path
                //           ? "activ-sidebar-link"
                //           : "normal-sidebar-link"
                //       }
                //     >
                //       {data.name}
                //     </Link>
                //   );
                // }
                if (ExactPathArr[0] === "Masters") {
                  if (noSecondBar.includes(data.name)) {
                    return (
                      <Link
                        href={data.path}
                        key={data.name}
                        className={
                          pathName === data.path
                            ? "activ-sidebar-link"
                            : "normal-sidebar-link"
                        }
                        style={pathName === data.path ? listStyles : {}}
                      >
                        {data.name}
                      </Link>
                    );
                  }
                  return (
                    <li
                      key={data.path}
                      className={
                        pathName === data.path
                          ? "activ-sidebar-link"
                          : "normal-sidebar-link"
                      }
                      style={pathName === data.path ? listStyles : {}}
                      onClick={(e) => {
                        handleSecondBarClick(e, data);
                      }}
                    >
                      {data.name}
                      <ArrowForwardIosIcon
                        sx={{ color: "#6f6f6f", fontSize: "0.6rem" }}
                        style={
                          open && pathName === data.path
                            ? { rotate: "90deg" }
                            : {}
                        }
                      />
                    </li>
                  );
                }
                return (
                  <Link
                    href={data.path}
                    key={data.name}
                    className={
                      pathName === data.path
                        ? "activ-sidebar-link"
                        : "normal-sidebar-link"
                    }
                    style={pathName === data.path ? listStyles : {}}
                  >
                    {data.name}
                  </Link>
                );
              })}
            </ul>
            <Popover
              id="mouse-over-popover"
              open={open}
              className="customPopoverShadow" // Apply the custom class
              anchorEl={SecondSideBar}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handleSecondBarClose}
              onBlur={handleSecondBarClose}
            >
              <nav className="masters-sidenavbar-class">
                <ul>
                  {Object.keys(
                    selectedMasterData ? selectedMasterData : []
                  )?.map((data: string) => (
                    <li
                      key={data}
                      className={
                        SelectedMasterDatatab === data
                          ? "active-second-bar-li-class"
                          : ""
                      }
                      style={
                        SelectedMasterDatatab === data ? subListStyles : {}
                      }
                      onClick={() => {
                        subListHandlerClick(data);
                      }}
                    >
                      {data}
                    </li>
                  ))}
                </ul>
              </nav>
            </Popover>
          </nav>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
