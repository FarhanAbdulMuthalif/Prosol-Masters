import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import TextareaOutline from "@/components/Textfield/TextareaOutline";
import { MaterialMasteresData } from "@/utils/MaterialMasters/MMData";
import { textCompStyle } from "@/utils/UserDataExport";

export default function MaterialMasterBasicFields() {
  const MasterDataJson = MaterialMasteresData;
  // const MMdata = MasterDataJson?.formFields?.filter(
  //   (data) => data.isField === true
  // );
  // console.log(MMdata);
  // const getDisplayName = (val: string) => {
  //   const rtnData = MMdata?.filter((data) => data.name === val)[0]?.displayName;
  //   return rtnData.length > 0 ? rtnData : capitalizeFunc(val);
  // };
  const MMSourceDesc = MasterDataJson.formFields?.filter(
    (data) => data.name === "sourceDesc"
  )[0];

  const MMNoun = MasterDataJson.formFields?.filter(
    (data) => data.name === "noun"
  )[0];
  const MMModifier = MasterDataJson.formFields?.filter(
    (data) => data.name === "modifier"
  )[0];
  const MMUOM = MasterDataJson.formFields?.filter(
    (data) => data.name === "UOM"
  )[0];
  const MMItemType = MasterDataJson.formFields?.filter(
    (data) => data.name === "itemType"
  )[0];

  return (
    <>
      {MMSourceDesc.view ? (
        <div className="create-mm-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            {MMSourceDesc.displayName}
            <span>:</span>
          </TextComp>
          <TextareaOutline
            placeholder={`Enter ${MMSourceDesc.displayName}`}
            disabled={!MMSourceDesc.modify}
            rows={2}
            fullWidth
          />
        </div>
      ) : (
        ""
      )}

      {MMNoun.view ? (
        <div className="create-mm-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            {MMNoun.displayName}
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter ${MMNoun.displayName}`}
            disabled={!MMNoun.modify}
            fullWidth
          />
        </div>
      ) : (
        ""
      )}
      {MMModifier.view ? (
        <div className="create-mm-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            {MMModifier.displayName}
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter ${MMModifier.displayName}`}
            disabled={!MMModifier.modify}
            fullWidth
          />
        </div>
      ) : (
        ""
      )}
      {MMUOM.view ? (
        <div className="create-mm-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            {MMUOM.displayName}
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter ${MMUOM.displayName}`}
            disabled={!MMUOM.modify}
            fullWidth
          />
        </div>
      ) : (
        ""
      )}
      {MMItemType.view ? (
        <div className="create-mm-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            {MMItemType.displayName}
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter ${MMItemType.displayName}`}
            disabled={!MMItemType.modify}
            fullWidth
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
