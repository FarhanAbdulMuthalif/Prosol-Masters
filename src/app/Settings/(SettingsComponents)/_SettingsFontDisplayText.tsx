import { fontPropertyProps } from "../../../../TypesStore";

export default function SettingsFontDisplayText({
  insideSelectFontProperty,
  insideSelectedFont,
}: {
  insideSelectFontProperty: fontPropertyProps[];
  insideSelectedFont: string;
}) {
  // const dataContextHub = useContext(UseContextHook);
  // const { fontPropertyArr } = dataContextHub;
  const [title, subTile, body, bodySmall] = insideSelectFontProperty;
  return (
    <section
      className="setting-font-display-example-section"
      style={{ fontFamily: insideSelectedFont }}
    >
      <h1
        style={{
          fontSize: `${title.fontSize}px`,
          fontWeight: title.fontWeight,
        }}
      >
        <u>Title </u>
      </h1>
      <h3
        style={{
          fontSize: `${subTile.fontSize}px`,
          fontWeight: subTile.fontWeight,
        }}
      >
        <u>SubTitle </u>
      </h3>
      <p
        style={{
          fontSize: `${body.fontSize}px`,
          fontWeight: body.fontWeight,
        }}
      >
        <u>Body Text</u> : Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Quo sint, veniam voluptatum fugit modi quaerat?
      </p>
      <p
        style={{
          fontSize: `${bodySmall.fontSize}px`,
          fontWeight: bodySmall.fontWeight,
        }}
      >
        <u>Small Body Text</u> : Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Odio ad ab sequi autem quae assumenda?
      </p>
    </section>
  );
}
