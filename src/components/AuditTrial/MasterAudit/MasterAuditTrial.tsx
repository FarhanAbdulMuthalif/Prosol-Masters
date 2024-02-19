import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import "./MasterAuditTrial.scss";
export default function MasterAuditTrial({ formData }: any) {
  return (
    <div className="edit-master-audit-trial-view">
      <div className="edit-master-audit-wrpr">
        <div className="edit-master-audit-trial-single-view">
          <p className="edit-master-audit-trial-label">Created By :</p>
          <p className="edit-master-audit-trial-label-value">
            {formData?.createdBy}
          </p>
        </div>
        <div className="edit-master-audit-trial-single-view">
          <p className="edit-master-audit-trial-label">Date and Time :</p>
          <p className="edit-master-audit-trial-label-value">
            {formData?.createdAt}
          </p>
        </div>
      </div>
      {/* <div className="edit-master-audit-wrpr">
        <div className="edit-master-audit-trial-single-view">
          <p className="edit-master-audit-trial-label">Updated By :</p>
          <p className="edit-master-audit-trial-label-value">
            {formData?.updatedBy}
          </p>
        </div>
        <div className="edit-master-audit-trial-single-view">
          <p className="edit-master-audit-trial-label">Date and Time :</p>
          <p className="edit-master-audit-trial-label-value">
            {formData?.updatedAt}
          </p>
        </div>
      </div> */}
      <div className="edit-master-audit-wrpr-accordion">
        <Accordion className="custom-accordion-shadow">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              padding: "0 16px",
              minHeight: "30px",
              "&.Mui-expanded": {
                minHeight: "42px", // Adjust the expanded minHeight
              },
              borderBottom: "1px solid rgba(73, 63, 53, 0.229)",
            }}
          >
            <Typography
              sx={{ color: "#6f6f6f", fontSize: "12px", fontWeight: "500" }}
            >
              Updated History
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="edit-master-audit-wrpr-accordion-inside-div">
              <div className="edit-master-audit-wrpr-accordion-inside-div-single-header">
                <p>Updated By</p>
                <p>Field</p>
                <p>Old Value</p>
                <p>New Value</p>
                <p>Date & Time</p>
              </div>
              {(formData?.updateAuditHistories
                ? formData?.updateAuditHistories
                : []
              ).map((data: any) => (
                <div
                  key={data?.id}
                  className="edit-master-audit-wrpr-accordion-inside-div-single"
                >
                  <p>{data?.updatedBy}</p>
                  <div className="edit-master-audit-wrpr-accordion-inside-div-single-arr">
                    {(data?.auditFields ? data?.auditFields : []).map(
                      (dta: any) => (
                        <div
                          className="audit-wrpr-accordion-inside-div-single-arr-ins"
                          key={dta?.id}
                        >
                          <p className="audit-wrpr-accordion-inside-div-single-arr-ins-txt">
                            {dta.fieldName}
                          </p>
                          <p className="audit-wrpr-accordion-inside-div-single-arr-ins-txt">
                            {dta.oldValue ? dta.oldValue : "-"}
                          </p>
                          <p className="audit-wrpr-accordion-inside-div-single-arr-ins-txt">
                            {dta.newValue}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                  <p>{data?.updatedAt}</p>
                </div>
              ))}
              {formData?.updateAuditHistories.length === 0 ? (
                <div className="edit-master-audit-wrpr-accordion-no-records">
                  <p className="edit-master-audit-wrpr-accordion-no-records-text">
                    No Update History
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
