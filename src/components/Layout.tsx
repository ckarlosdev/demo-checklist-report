import { Col, Container, Row } from "react-bootstrap";
import Title from "./Title";
import JobData from "./JobData";
import ReportData from "./ReportData";
import Sections from "./Sections";
import ActionButtons from "./ActionButtons";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useContextStore } from "../stores/useContextStore";
import { useDemoChecklist } from "../hooks/useDemoChecklist";
import useReportDataStore from "../stores/useReportDataStore";
import { useReactToPrint } from "react-to-print";

type Props = {};

function Layout({}: Props) {
  const componenteRef = useRef(null);
  const [searchParams] = useSearchParams();
  const { setIds, demoChecklistId, isLoaded, setIsLoaded, jobId } =
    useContextStore();
  const { setFullDailyReportData, reset } = useReportDataStore();

  const {
    data: report,
    isLoading,
    isError,
  } = useDemoChecklist(demoChecklistId ? Number(demoChecklistId) : 0);

  useEffect(() => {
    if (report && !isLoaded) {
      setFullDailyReportData(report);
      setIsLoaded(true);
    }
  }, [report]);

  useEffect(() => {
    const jobIdParam = searchParams.get("jobId");
    const demoChecklistIdParam = searchParams.get("demoChecklistId");
    // console.log("Search Params:", { jobIdParam, demoChecklistIdParam });
    const isNewAction = searchParams.get("action") === "new";
    const isDifferentJob = jobId && Number(jobIdParam) !== jobId;

    if (
      isNewAction ||
      (jobIdParam && isDifferentJob && !demoChecklistIdParam)
    ) {
      reset();
    }

    if (jobIdParam || demoChecklistIdParam) {
      const storedJobId = Number(jobIdParam);
      const storedDemoChecklistId = Number(demoChecklistIdParam);
      if (!isNaN(storedJobId) || !isNaN(storedDemoChecklistId)) {
        setIds(storedJobId, storedDemoChecklistId);
      }
    }
  }, [searchParams]);

  const pageStyle = `
  @page {
    size: auto;
    margin: 10mm;
  }
  @media print {
    body {
      -webkit-print-color-adjust: exact;
    }
    
    /* Forzar que las columnas de Bootstrap no se apilen */
    .row {
      display: flex !important;
      flex-wrap: wrap !important;
      flex-direction: row !important;
    }

    /* Definir anchos fijos para simular md={6} o lg={3} */
    .col-md-6 {
      flex: 0 0 50% !important;
      max-width: 50% !important;
    }
    
    .col-lg-3 {
      flex: 0 0 25% !important;
      max-width: 25% !important;
    }

    /* Evitar que una tarjeta se rompa a la mitad entre dos páginas */
    .card {
      break-inside: avoid;
      margin-bottom: 10px !important;
    }

    /* Optimizar el espacio de los bordes y rellenos */
    .card-body {
      padding: 5px !important;
    }
  }
`;

  const handlePrint = useReactToPrint({
    contentRef: componenteRef,
    documentTitle: "Demo Checklist Report",
    pageStyle: pageStyle,
  });

  if (isLoading) return <div>Loading report data...</div>;
  if (isError) return <div>Error loading report data.</div>;

  return (
    <Container ref={componenteRef} className="print-container">
      <Row className="justify-content-md-center">
        <Col>
          <Title onPrint={handlePrint} />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <JobData />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <ReportData />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <Sections />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <ActionButtons />
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
