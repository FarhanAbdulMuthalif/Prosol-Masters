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
        borderBottom: "0.5px solid #c5ccd4",
        minHeight: "35px",
        alignItems: "center",
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
            borderRadius: "5px",
            minHeight: "25px",
            "&.Mui-selected": {
              backgroundColor: ThemeColor.primaryColor,
              color: "white",
            },
          }}
        />
      ))}
    </MuiTabs>
  );
};

export default CustomTabs;
