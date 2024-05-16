// components/Tabs.tsx
import { UseContextHook } from "@/Provides/UseContextHook";
import { Tabs as MuiTabs, Tab, TabProps, TabsProps } from "@mui/material";
import React, { useContext } from "react";

interface CustomTabsProps extends TabsProps {
  tabs: TabProps[];
  // You can add any additional custom props here
  // Example: customProp?: string;
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, ...props }) => {
  const ContextDataHub = useContext(UseContextHook);

  const { ThemeColor } = ContextDataHub;
  return (
    <MuiTabs
      {...props}
      sx={{
        // backgroundColor: ThemeColor.tertiaryColor,
        display: "flex",
        flexDirection: "row",
        borderBottom: "0.5px solid #c5ccd4",
        minHeight: "25px",
        // alignItems: "center",
        "& .MuiTabs-indicator": {
          backgroundColor: "transparent",
        },
      }}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          {...tab}
          sx={{
            padding: "0 5px",
            marginRight: "3px",
            minHeight: "25px",
            border: "1px solid #c5ccd4",
            borderBottom: "none",
            borderRadius: "5px 5px 0 0",
            // "&:hover": {
            //   fontWeight: "700",
            // },
            "&.Mui-selected": {
              // borderRadius: "5px",
              backgroundColor: ThemeColor.primaryColor,
              color: "white",
              fontWeight: "700",
            },
          }}
        />
      ))}
    </MuiTabs>
  );
};

export default CustomTabs;
