import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import { textCompStyleMM } from "@/utils/UserDataExport";

export default function MMPlantMRPData() {
  return (
    <div className="material-master-plant-plant-content">
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          MRP Type
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter MRP Type`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          MRP Controller
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter MRP Controller`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Quantity
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Quantity`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Re-Order Point
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Re-Order Point`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          LOT Size
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter LOT Size`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Max. Stock Level
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Max. Stock Level`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Min. Stock Level
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Min. Stock Level`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Procurement Type
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Procurement Type`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Planning Strategy Group
          <span>:</span>
        </TextComp>
        <OutlineTextField
          placeholder={`Enter Planning Strategy Group`}
          fullWidth
        />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Planned Delivery Time
          <span>:</span>
        </TextComp>
        <OutlineTextField
          placeholder={`Enter Planned Delivery Time`}
          fullWidth
        />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Availability Check
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Availability Check`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Schedule Margin
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Schedule Margin`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Safety Stock
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Safety Stock`} fullWidth />
      </div>
    </div>
  );
}
