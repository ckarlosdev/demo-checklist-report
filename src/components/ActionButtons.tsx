import { Button, Card, Spinner } from "react-bootstrap";
import useReportDataStore from "../stores/useReportDataStore";
import { useContextStore } from "../stores/useContextStore";
// import useUser from "../hooks/useUser";
import { useSaveDemoChecklist } from "../hooks/useDemoChecklist";
import { useAuthStore } from "../hooks/authStore";

type Props = {};

function ActionButtons({}: Props) {
  const { jobId, setIsLoaded } = useContextStore();
  const { demoReport, reset, setFullDailyReportData } = useReportDataStore();
  const { user: userAuth } = useAuthStore();

  const { mutate, isPending: isSaving } = useSaveDemoChecklist();

  const handleSave = () => {
    if (!validateReportData()) {
      return;
    }

    const payload = {
      ...demoReport,
      jobsId: jobId,
    };

    console.log("Saving Demo Checklist with data:", payload);
    setFullDailyReportData(payload);
    mutate({ reportData: payload });
  };

  const validateReportData = () => {
    if (jobId === null) {
      alert("Job ID is null. Please select a job.");
      return false;
    }

    if (demoReport.foreman.trim() === "") {
      alert("Foreman field is required.");
      return false;
    }

    if (demoReport.checklistDate.trim() === "") {
      alert("Checklist Date field is required.");
      return false;
    }

    return true;
  };

  const isAuthorized = userAuth?.roles?.some(
    (role) =>
      role.name === "ROLE_SUPERVISOR" || role.name === "ROLE_SUPERINTENDENT",
  );

  return (
    <>
      <Card style={{ marginBottom: "2px" }} className="no-print">
        <Card.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: "50px",
            }}
            className="no-print"
          >
            <Button
              style={{
                width: "200px",
                height: "60px",
                fontWeight: "bold",
                fontSize: "25px",
                marginRight: "20px",
              }}
              onClick={() => {
                reset();
                setIsLoaded(false);
                window.location.href = `https://ckarlosdev.github.io/binder-webapp/#/binder/${jobId}`;
              }}
              variant="outline-primary"
              className="no-print"
            >
              <i className="bi bi-backspace" style={{ margin: "6px" }}></i>
              Back
            </Button>
            <Button
              style={{
                width: "200px",
                height: "60px",
                fontWeight: "bold",
                fontSize: "25px",
                marginLeft: "20px",
              }}
              variant="outline-primary"
              onClick={() => {
                handleSave();
              }}
              disabled={isSaving || !isAuthorized}
              className="no-print"
            >
              {isSaving ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: "10px" }}
                  />
                  Saving...
                </>
              ) : (
                "Save"
              )}
              <i className="bi bi-floppy" style={{ margin: "6px" }}></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ActionButtons;
