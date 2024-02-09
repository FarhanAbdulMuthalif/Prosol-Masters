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
      <div className="edit-master-audit-wrpr">
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
      </div>
    </div>
  );
}
