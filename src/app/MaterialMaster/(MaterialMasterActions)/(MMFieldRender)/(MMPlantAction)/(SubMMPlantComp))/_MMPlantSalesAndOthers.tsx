import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import { textCompStyleMM } from "@/utils/UserDataExport";

export default function MMPlantSalesAndOthers() {
  return (
    <div className="material-master-plant-plant-content">
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Acc Asignmt Category
          <span>:</span>
        </TextComp>
        <OutlineTextField
          placeholder={`Enter Acc Asignmt Category`}
          fullWidth
        />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Purchasing Value Key
          <span>:</span>
        </TextComp>
        <OutlineTextField
          placeholder={`Enter Purchasing Value Key`}
          fullWidth
        />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Goods Recept Processing Time
          <span>:</span>
        </TextComp>
        <OutlineTextField
          placeholder={`Enter Goods Recept Processing Time`}
          fullWidth
        />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Tax Classification 1<span>:</span>
        </TextComp>
        <OutlineTextField
          placeholder={`Enter Tax Classification 1`}
          fullWidth
        />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Tax Classification 2<span>:</span>
        </TextComp>
        <OutlineTextField
          placeholder={`Enter Tax Classification 2`}
          fullWidth
        />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Transportation Group
          <span>:</span>
        </TextComp>
        <OutlineTextField
          placeholder={`Enter Transportation Group`}
          fullWidth
        />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Loading Group
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Loading Group`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Sales Text
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Sales Text`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Order Unit
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Order Unit`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Item Category Group
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Item Category Group`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Sales Organization
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Sales Organization`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Delivering Plant
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Delivering Plant`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Automatic PO
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Valuation Type`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Distribution Channel
          <span>:</span>
        </TextComp>
        <OutlineTextField
          placeholder={`Enter Distribution Channel`}
          fullWidth
        />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Material Group
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Material Group`} fullWidth />
      </div>
      <div className="create-mm-plant-plant-wrapper-single-input">
        <TextComp variant="bodySmall" style={textCompStyleMM}>
          Purchasing Group
          <span>:</span>
        </TextComp>
        <OutlineTextField placeholder={`Enter Purchasing Group`} fullWidth />
      </div>
    </div>
  );
}
