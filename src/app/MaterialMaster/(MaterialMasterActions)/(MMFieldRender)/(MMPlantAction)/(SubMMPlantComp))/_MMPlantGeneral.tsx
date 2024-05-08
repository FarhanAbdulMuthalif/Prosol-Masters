import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import { textCompStyleMM } from "@/utils/UserDataExport";

export default function MMPlantGeneral() {
  return (
    <div className="material-master-plant-plant-content">
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Industry Sector
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Industry Sector`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Inspection Type
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Inspection Type`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Base UOP
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Base UOP`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Inspection Code
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Inspection Code`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Unit of Issue
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Unit of Issue`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Old Material No.
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Old Material No.`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Alternate UOM
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Alternate UOM`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Division
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Division`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Numerator
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Numerator`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Sales Unit
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Sales Unit`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Denominator
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Denominator`} fullWidth />
      </div>
    </div>
  );
}
