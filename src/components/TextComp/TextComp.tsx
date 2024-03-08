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
  fontSize: number;
  fontWeight: string;
};

type FontData = {
  title: FontItem;
  subTitle: FontItem;
  body: FontItem;
  bodySmall: FontItem;
};
const TextComp: React.FC<TextProps> = ({ variant, children, style }) => {
  // const Montserrat = localFont({
  //   src: [
  //     {
  //       path: "./Montserrat-Regular.otf",
  //       weight: "400",
  //       style: "normal",
  //     },
  //     {
  //       path: "./Montserrat-Medium.otf",
  //       weight: "60000",
  //       style: "normal",
  //     },
  //     {
  //       path: "./Montserrat-Bold",
  //       weight: "bold",
  //       style: "normal",
  //     },
  //   ],
  // });

  const dataContextHub = useContext(UseContextHook);

  const { fontPropertyArr, selectedFont } = dataContextHub;
  const transformedData: FontData = fontPropertyArr.reduce((result, item) => {
    result[item.fontFormat as keyof FontData] = {
      fontSize: item.fontSize,
      fontWeight: item.fontWeight,
    };
    return result;
  }, {} as FontData);

  const selectedFntData = transformedData[variant];

  return (
    <p
      // className={Montserrat.className}
      style={{
        fontFamily: selectedFont,
        fontSize: `${selectedFntData?.fontSize}px`,
        fontWeight: selectedFntData?.fontWeight,
        ...style,
      }}
    >
      {children}
    </p>
  );
};

export default TextComp;
