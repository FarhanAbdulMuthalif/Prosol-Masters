import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import { textCompStyleMM } from "@/utils/UserDataExport";

export default function MMPlantPlant() {
  return (
    <div className="material-master-plant-plant-content">
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Plant
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Plant`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Price Control
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Price Control`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Profit Center
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Profit Center`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Standard Price
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Standard Price`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Storage Location
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Storage Location`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Moving Avg. Price
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Moving Avg. Price`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Storage Bin
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Storage Bin`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Valuation Category
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Valuation Category`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Material Type
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Material Type`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Variance Key
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Variance Key`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Valuation Class
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Valuation Class`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Batch Management
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Batch Management`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Valuation Type
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Valuation Type`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Serial No. Profile
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Serial No. Profile`} fullWidth />
      </div>
    </div>
  );
}
