import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import { textCompStyleMM } from "@/utils/UserDataExport";

export default function MMCodeLogic() {
  return (
    <div className="material-master-code-logic">
      <div className="create-mm-description-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Class Title
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Class Title`} fullWidth />
      </div>
      <div className="create-mm-description-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Class
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Class`} fullWidth />
      </div>
      <div className="create-mm-description-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Commodity Title
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Commodity Title`} fullWidth />
      </div>
      <div className="create-mm-description-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Commodity
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Commodity`} fullWidth />
      </div>
    </div>
  );
}
