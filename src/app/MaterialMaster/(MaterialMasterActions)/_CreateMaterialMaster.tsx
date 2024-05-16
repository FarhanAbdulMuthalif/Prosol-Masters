"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import TimeLineDialog from "@/components/Dialog/TimeLineDialog";
import ColoredTabs from "@/components/Tabs/ColoredTabs";
import { MaterialMasteresData } from "@/utils/MaterialMasters/MMData";
import { getMMTabData } from "@/utils/MaterialMasters/MMfunctions";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import EditNoteIcon from "@mui/icons-material/EditNote";
import JoinRightIcon from "@mui/icons-material/JoinRight";
import { Tooltip } from "@mui/material";
import { ReactNode, useContext, useState } from "react";
import MMCodeLogic from "./(MMFieldRender)/(MMCodeLogic)/_MMCodeLogic";
import MMPlant from "./(MMFieldRender)/(MMPlantAction)/_MMPlant";
import MMDescription from "./(MMFieldRender)/_MMDescription";
import MaterialMasterBasicFields from "./(MMFieldRender)/_MaterialMasterBasicFields";

export default function CreateMaterialMaster() {
  const tabs = getMMTabData() || [];
  const [tabValue, settabValue] = useState(tabs[0].value);
  const { ThemeColor } = useContext(UseContextHook);
  const [timeLineDialog, setTimeLineDialog] = useState(false);
  const timelineDialogHandler = () => {
    setTimeLineDialog(false);
  };
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "description" | "plant" | "codeLogic" | "attachment"
  ) => {
    settabValue(newValue);
  };
  const MMSourceDesc = MaterialMasteresData.formFields?.filter(
    (data) => data.name === "sourceDesc"
  )[0];
  // let tabs = [
  //   { label: `Description`, value: "description" },
  //   { label: `Plant`, value: "plant" },
  //   { label: `Code Logic`, value: "CodeLogic" },
  //   { label: `Attachment`, value: "attachment" },
  //   { label: `Physical Observation`, value: "physicalObservation" },
  // ];
  const description = <MMDescription />;
  const ERPData = <MMPlant />;
  const codeLogic = <MMCodeLogic />;

  const dataWithElements: Record<string, ReactNode> = {
    description,
    ERPData,
    codeLogic,
  };
  const tabObjValue: Record<string, ReactNode> = {
    // attachment: <MaterialMasterBasicFields />,
    // physicalObservation: <MaterialMasterBasicFields />,
  };

  tabs.forEach((tab) => {
    tabObjValue[tab.value] = dataWithElements[tab.value];
  });
  const iconStyle = {
    color: ThemeColor.primaryColor,
    cursor: "pointer",
    fontSize: "0.9rem",
  };

  return (
    <section className="create-material-master-module">
      <div className="material-master-basic-fields">
        <MaterialMasterBasicFields />
      </div>
      <div className="material-master-description-fields">
        <div className="material-master-description-fields-colored-tabs-wrapper">
          <div className="material-master-description-fields-colored-tabs">
            <ColoredTabs
              value={tabValue}
              onChange={handleChange}
              tabs={tabs}
            ></ColoredTabs>
          </div>
          <div className="material-master-description-fields-colored-tabs-content">
            <Tooltip title="View Item Status">
              <AccountTreeIcon
                sx={iconStyle}
                onClick={() => {
                  setTimeLineDialog(true);
                }}
              />
            </Tooltip>
            <Tooltip title="Click here to view similar items">
              <JoinRightIcon sx={iconStyle} />
            </Tooltip>
            <div className="material-master-description-fields-colored-tabs-item-image"></div>
            <Tooltip title="Click Here to view Remarks History">
              <EditNoteIcon sx={iconStyle} />
            </Tooltip>
          </div>
        </div>

        {tabObjValue[tabValue]}
      </div>
      <TimeLineDialog
        open={timeLineDialog}
        onCancel={timelineDialogHandler}
        title="Item Current Status"
      />
    </section>
  );
}
