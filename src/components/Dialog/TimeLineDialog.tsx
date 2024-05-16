import { PrimaryTextColor } from "@/styles/colorsCode";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";
import FillButton from "../Button/FillButton";
import OutlinedButton from "../Button/OutlineButton";
import TextComp from "../TextComp/TextComp";
import ReusableTimeline from "../Timeline/Timeline";

const events = [
  {
    title: "Requester",
    description: "Remarks for requester",
    timestamp: "2024-05-15 8:00 AM",
    status: "completed",
  },
  {
    title: "Approver",
    description: "Remarks for approver",
    timestamp: "2024-05-15 10:00 AM",
    status: "working",
  },
  {
    title: "Cataloguer",
    description: "Remarks for Cataloguer",
    timestamp: "2024-05-16 11:00 AM",
    status: "clarification",
  },
  {
    title: "Reviewer",
    description: "Remarks for Reviewer",
    timestamp: "2024-05-16 11:00 AM",
    status: "toBeDone",
  },
  {
    title: "Releaser",
    description: "Remarks for Releaser",
    timestamp: "2024-05-16 11:00 AM",
    status: "toBeDone",
  },
  // Add more events as needed
];
interface TimeLineDialogProps {
  open: boolean;
  title: string;
  onCancel: () => void;
}

const TimeLineDialog: FC<TimeLineDialogProps> = ({ open, title, onCancel }) => {
  const statusTypes = [
    { type: "completed", color: "green" },
    { type: "working", color: "blue" },
    { type: "clarify", color: "orange" },
    { type: "reject", color: "red" },
    { type: "toBeDone", color: "grey" },
  ];
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onCancel}>
      <DialogTitle
        sx={{
          borderBottom: " 0.5px solid #e3e6ea",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextComp
          variant="title"
          style={{ color: PrimaryTextColor, textTransform: "uppercase" }}
        >
          {title}
        </TextComp>
        <TextComp variant="bodySmall" style={{ color: PrimaryTextColor }}>
          Item Code : <span style={{ fontWeight: "700" }}>02272024001-001</span>
        </TextComp>

        {/* {statusTypes.map((data) => (
          <div
            className="color-represt-to-status"
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
            key={data.type}
          >
            <div
              className="color-represt-to-status-box"
              style={{
                backgroundColor: data.color,
                height: "10px",
                width: "10px",
              }}
            ></div>
            <TextComp variant="bodySmall">
              {splitWordByCapitalLetter(capitalizeFunc(data.type))}
            </TextComp>
          </div>
        ))} */}
        <Close onClick={onCancel} sx={{ cursor: "pointer" }} />
      </DialogTitle>
      <DialogContent sx={{ color: PrimaryTextColor }}>
        <ReusableTimeline events={events} />
      </DialogContent>
      <DialogActions sx={{ borderTop: " 0.5px solid #e3e6ea", padding: "5px" }}>
        <OutlinedButton onClick={onCancel} variant="outlined">
          No
        </OutlinedButton>
        <FillButton variant="contained">Yes</FillButton>
      </DialogActions>
    </Dialog>
  );
};

export default TimeLineDialog;
