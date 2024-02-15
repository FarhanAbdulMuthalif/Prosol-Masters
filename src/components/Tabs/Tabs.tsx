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
        "& .MuiTabs-indicator": {
          backgroundColor: ThemeColor.primaryColor, // Set your custom color for the active indicator
        },
      }}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          {...tab}
          sx={{
            "&.Mui-selected": {
              color: ThemeColor.primaryColor, // Set your custom color for the active text
            },
          }}
        />
      ))}
    </MuiTabs>
  );
};

export default CustomTabs;
