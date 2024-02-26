import { UseContextHook } from "@/Provides/UseContextHook";
import { useContext } from "react";

export default function SettingsFontDisplayText() {
  const dataContextHub = useContext(UseContextHook);

  const { fontPropertyArr } = dataContextHub;
  const [title, subTile, body, bodySmall] = fontPropertyArr;
  return (
    <section className="setting-font-display-example-section">
      <h1
        style={{
          fontSize: `${title.defaultSize}px`,
          fontWeight: title.fontWeight,
        }}
      >
        <u>Title (Heading)</u> :
      </h1>
      <h3
        style={{
          fontSize: `${subTile.defaultSize}px`,
          fontWeight: subTile.fontWeight,
        }}
      >
        <u>SubTitle Text</u> :
      </h3>
      <p
        style={{
          fontSize: `${body.defaultSize}px`,
          fontWeight: body.fontWeight,
        }}
      >
        <u>Body Text</u> : Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Asperiores, doloribus voluptatibus. Perspiciatis distinctio error
        facere, quas dolores expedita delectus ea laborum nisi unde
        exercitationem ad nostrum dolorum neque adipisci nam.
      </p>
      <p
        style={{
          fontSize: `${bodySmall.defaultSize}px`,
          fontWeight: bodySmall.fontWeight,
        }}
      >
        <u>Small Body Text</u> : Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Maiores illum voluptatibus alias dolore dolorum odio
        animi harum voluptates aliquid aliquam accusantium facere vero, voluptas
        assumenda molestias deleniti enim doloremque. Laborum.
      </p>
    </section>
  );
}
