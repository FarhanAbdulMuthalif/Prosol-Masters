// components/ReusableTimeline.tsx

import { capitalizeFunc } from "@/utils/capitalizeFunc";
import { splitWordByCapitalLetter } from "@/utils/splitWordByCapitalLetter";
import {
  Close,
  Engineering,
  HowToReg,
  ManageHistory,
  Person,
} from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { FC, ReactNode } from "react";
import TextComp from "../TextComp/TextComp";

interface TimelineEvent {
  title: string;
  description: string;
  timestamp: string;
  status: string;
}

interface ReusableTimelineProps {
  events: TimelineEvent[];
}
const iconObj: Record<string, ReactNode> = {
  completed: (
    <TimelineDot color="success">
      <HowToReg />
    </TimelineDot>
  ),
  cancelled: (
    <TimelineDot color="error">
      <Close />
    </TimelineDot>
  ),
  working: (
    <TimelineDot color="primary">
      <Engineering />
    </TimelineDot>
  ),
  clarification: (
    <TimelineDot color="warning">
      <ManageHistory />
    </TimelineDot>
  ),
  toBeDone: (
    <TimelineDot color="grey">
      <Person />
    </TimelineDot>
  ),
};
const ReusableTimeline: FC<ReusableTimelineProps> = ({ events }) => {
  return (
    <Timeline position="alternate">
      {events.map((event, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            // align="right"
            //   variant="body2"
            //   color="text.secondary"
          >
            <TextComp variant="bodySmall">{event.timestamp}</TextComp>
            <TextComp variant="bodySmall">
              Status : &nbsp;
              <span style={{ fontWeight: "700" }}>
                {splitWordByCapitalLetter(capitalizeFunc(event.status))}
              </span>
            </TextComp>
          </TimelineOppositeContent>
          <TimelineSeparator>
            {/* <TimelineDot color="primary">{event.icon}</TimelineDot> */}
            {iconObj[event.status]}
            {index < events.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent sx={{ m: "auto 0" }}>
            <TextComp variant="title" style={{ textTransform: "uppercase" }}>
              {event.title}
            </TextComp>
            <TextComp variant="bodySmall">{event.description}</TextComp>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default ReusableTimeline;
