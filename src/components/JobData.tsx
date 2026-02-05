import {
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import useJob from "../hooks/useJob";
import { useContextStore } from "../stores/useContextStore";

type Props = {};

function JobData({}: Props) {
  const { jobId } = useContextStore();
  const { data: job, isLoading, isError } = useJob(jobId ? Number(jobId) : 0);

  if (isLoading) return <div>Loading Job data {jobId}...</div>;
  if (isError) return <div>Error loading Job data.</div>;

  return (
    <>
      <Card style={{ marginBottom: "2px" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center", fontWeight: "bold" }}>
            Job data
          </Card.Title>
          <Container>
            <Row className="mb-3">
              <Col xs={6}>
                <FloatingLabel
                  controlId="floatingInputJobNumber"
                  label="Job Number"
                >
                  <Form.Control
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                    readOnly
                    value={job?.number ?? ""}
                    type="text"
                    placeholder="#"
                  />
                </FloatingLabel>
              </Col>
              <Col xs={6}>
                <FloatingLabel
                  controlId="floatingInputJobAddress"
                  label="Job Address"
                  className="mb-1"
                >
                  <Form.Control
                    type="text"
                    placeholder="#"
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                    readOnly
                    value={job?.address ?? ""}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mb-1">
              <Col xs={12}>
                <FloatingLabel
                  controlId="floatingInputJobName"
                  label="Job Name"
                >
                  <Form.Control
                    type="text"
                    placeholder="#"
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                    readOnly
                    value={job?.name ?? ""}
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
}

export default JobData;
