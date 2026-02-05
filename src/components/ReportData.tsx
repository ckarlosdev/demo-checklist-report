import { Card, CardBody, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import useEmployees from "../hooks/useEmployee";
import useReportDataStore from "../stores/useReportDataStore";

type Props = {};

function ReportData({}: Props) {
  const { data: employees } = useEmployees();
  const { demoReport, setDemoReport } = useReportDataStore();

  const supervisorOptions = employees?.filter(
    (emp) => emp.title === "Supervisor",
  );

  const supervisorSorted = supervisorOptions?.sort((a, b) =>
    a.firstName.localeCompare(b.firstName),
  );

  const handleMultipleChange = (type: string, checked: boolean) => {
    const currentString = demoReport.buildingType ?? "";
    const currentValues = currentString !== "" ? currentString.split(", ") : [];

    let newValues;
    if (checked) {
      newValues = [...currentValues, type];
    } else {
      newValues = currentValues.filter((val) => val !== type);
    }
    setDemoReport("buildingType", newValues.join(", "));
  };

  return (
    <>
      <Card style={{ marginBottom: "2px" }}>
        <Card.Body>
          <Row>
            <Col xs={6}>
              <FloatingLabel controlId="foreman" label="Forman">
                <Form.Select
                  aria-label="Default select example"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  value={demoReport.foreman}
                  onChange={(e) => {
                    const val = e.target.value === "" ? "" : e.target.value;
                    setDemoReport("foreman", val);
                  }}
                >
                  <option value="">Open this select foreman</option>
                  {supervisorSorted?.map((emp) => (
                    <option
                      key={emp.employeesId}
                      value={emp.firstName + " " + emp.lastName}
                      style={{ fontWeight: "bold" }}
                    >
                      {emp.firstName} {emp.lastName}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col xs={6}>
              <FloatingLabel controlId="date" label="Date">
                <Form.Control
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  type="date"
                  placeholder="#"
                  value={demoReport.checklistDate}
                  onChange={(e) =>
                    setDemoReport("checklistDate", e.target.value)
                  }
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Card>
                <CardBody style={{ fontWeight: "bold" }}>
                  <Card.Title
                    style={{ textAlign: "center", marginBottom: "10px" }}
                  >
                    Building Type
                  </Card.Title>
                  <Row className="justify-content-md-center">
                    <Col xs="auto">
                      <Form.Check
                        type="switch"
                        id="cbWood"
                        label="Wood"
                        checked={
                          demoReport.buildingType?.includes("Wood") ?? false
                        }
                        onChange={(e) =>
                          handleMultipleChange("Wood", e.target.checked)
                        }
                      />
                    </Col>
                    <Col xs="auto">
                      <Form.Check
                        type="switch"
                        id="cbMetal"
                        label="Metal"
                        checked={
                          demoReport.buildingType?.includes("Metal") ?? false
                        }
                        onChange={(e) =>
                          handleMultipleChange("Metal", e.target.checked)
                        }
                      />
                    </Col>
                    <Col xs="auto">
                      <Form.Check
                        type="switch"
                        id="cbConcrete"
                        label="Concrete"
                        checked={
                          demoReport.buildingType?.includes("Concrete") ?? false
                        }
                        onChange={(e) =>
                          handleMultipleChange("Concrete", e.target.checked)
                        }
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <FloatingLabel controlId="notes" label="Notes">
                <Form.Control
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    height: "100px",
                  }}
                  as="textarea"
                  placeholder="#"
                  value={demoReport.notes}
                  onChange={(e) => setDemoReport("notes", e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default ReportData;
