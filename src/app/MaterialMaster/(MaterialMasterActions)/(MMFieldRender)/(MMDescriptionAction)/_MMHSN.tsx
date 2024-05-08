import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import { textCompStyleMM } from "@/utils/UserDataExport";

export default function MMHSN() {
  return (
    <div className="material-master-description-fields-content-equipment">
      <div className="create-mm-description-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Search
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Search`} fullWidth />
      </div>
      <div className="create-mm-description-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          HSN ID
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter HSN ID`} fullWidth />
      </div>
      <div className="create-mm-description-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          HSN Description
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter HSN Description`} fullWidth />
      </div>
    </div>
  );
}
