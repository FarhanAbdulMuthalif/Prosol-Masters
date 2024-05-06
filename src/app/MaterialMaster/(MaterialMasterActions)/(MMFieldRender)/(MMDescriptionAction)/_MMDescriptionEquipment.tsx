import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import TextareaOutline from "@/components/Textfield/TextareaOutline";
import { textCompStyle } from "@/utils/UserDataExport";

export default function MMDescriptionEquipment() {
  return (
    <div className="material-master-description-fields-content-equipment">
      <div className="create-mm-description-wrapper-single-input">
        <TextComp variant="subTitle" style={textCompStyle}>
          Equipment Name
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Equipment Name`} fullWidth />
      </div>
      <div className="create-mm-description-wrapper-single-input">
        <TextComp variant="subTitle" style={textCompStyle}>
          Equipment Model No
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Equipment Model No`} fullWidth />
      </div>
      <div className="create-mm-description-wrapper-single-input">
        <TextComp variant="subTitle" style={textCompStyle}>
          Equipment MFR
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Equipment MFR`} fullWidth />
      </div>
      <div className="create-mm-description-wrapper-single-input">
        <TextComp variant="subTitle" style={textCompStyle}>
          Equipment Tag No
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Equipment Tag No`} fullWidth />
      </div>
      <div className="create-mm-description-wrapper-single-input">
        <TextComp variant="subTitle" style={textCompStyle}>
          Additional Information
          <span>:</span>
        </TextComp>
        <TextareaOutline
          rows={2}
          placeholder={`Enter Additional Information`}
          fullWidth
        />
      </div>
      <div className="create-mm-description-wrapper-single-input">
        <TextComp variant="subTitle" style={textCompStyle}>
          Equipment Serial No
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Equipment Serial No`} fullWidth />
      </div>
    </div>
  );
}
