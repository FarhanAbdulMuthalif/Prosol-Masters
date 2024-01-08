// components/Tabs.tsx
import { Tabs as MuiTabs, Tab, TabProps, TabsProps } from "@mui/material";
import React from "react";

interface CustomTabsProps extends TabsProps {
  tabs: TabProps[];
  // You can add any additional custom props here
  // Example: customProp?: string;
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, ...props }) => {
  return (
    <MuiTabs {...props}>
      {tabs.map((tab, index) => (
        <Tab key={index} {...tab} />
      ))}
    </MuiTabs>
  );
};

export default CustomTabs;
