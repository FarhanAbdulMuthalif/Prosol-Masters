// components/Text.tsx
import { UseContextHook } from "@/Provides/UseContextHook";
import React, { useContext } from "react";
import "./TextComp.scss";
interface TextProps {
  variant: "title" | "subTitle" | "body" | "bodySmall";
  children: React.ReactNode;
  style?: React.CSSProperties;
}

type FontItem = {
  defaultSize: number;
  fontWeight: string;
};

type FontData = {
  title: FontItem;
  subTitle: FontItem;
  body: FontItem;
  bodySmall: FontItem;
};
const TextComp: React.FC<TextProps> = ({ variant, children, style }) => {
  const dataContextHub = useContext(UseContextHook);

  const { fontPropertyArr } = dataContextHub;

  const transformedData: FontData = fontPropertyArr.reduce((result, item) => {
    result[item.name as keyof FontData] = {
      defaultSize: item.defaultSize,
      fontWeight: item.fontWeight,
    };
    return result;
  }, {} as FontData);

  const selectedFntData = transformedData[variant];
  return (
    <p
      style={{
        fontSize: `${selectedFntData.defaultSize}px`,
        fontWeight: selectedFntData.fontWeight,
        ...style,
      }}
    >
      {children}
    </p>
  );
};

export default TextComp;
