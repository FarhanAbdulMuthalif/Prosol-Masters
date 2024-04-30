import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
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
  const MMLegacyData = MasterDataJson.formFields?.filter(
    (data) => data.name === "legacyData"
  )[0];
  const MMLegacySearch = MasterDataJson.formFields?.filter(
    (data) => data.name === "legacySearch"
  )[0];
  const MMAdditionalLegacy = MasterDataJson.formFields?.filter(
    (data) => data.name === "additionalLegacy"
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
      {MMLegacyData.view ? (
        <div className="create-mm-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            {MMLegacyData.displayName}
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter ${MMLegacyData.displayName}`}
            disabled={!MMLegacyData.modify}
            fullWidth
          />
        </div>
      ) : (
        ""
      )}
      {MMLegacySearch.view ? (
        <div className="create-mm-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            {MMLegacySearch.displayName}
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter ${MMLegacySearch.displayName}`}
            disabled={!MMLegacySearch.modify}
            fullWidth
          />
        </div>
      ) : (
        ""
      )}
      {MMAdditionalLegacy.view ? (
        <div className="create-mm-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            {MMAdditionalLegacy.displayName}
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter ${MMAdditionalLegacy.displayName}`}
            disabled={!MMAdditionalLegacy.modify}
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
