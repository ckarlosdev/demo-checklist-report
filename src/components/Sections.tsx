import { Card, Col, Form, Row } from "react-bootstrap";
import useItems from "../hooks/useItems";
import useReportDataStore from "../stores/useReportDataStore";
import "../style/buttons.css";

type Props = {};

function Sections({}: Props) {
  const { data: items } = useItems();
  const { demoReport, setItemResponse } = useReportDataStore();

  const groupedItems = items?.reduce(
    (groups, question) => {
      const cardTitle = question.itemGroup;
      if (!groups[cardTitle]) {
        groups[cardTitle] = [];
      }
      groups[cardTitle].push(question);
      return groups;
    },
    {} as { [key: string]: typeof items },
  );

  return (
    <>
      {Object.entries(groupedItems || {}).map(([cardTitle, itemsInGroup]) => (
        <Card key={cardTitle} style={{ marginBottom: "2px" }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontWeight: "bold" }}>
              {cardTitle}
            </Card.Title>
            <Row className="justify-content-md-center">
              {itemsInGroup.map((item) => {
                const currentResponse = (demoReport.items ?? []).find(
                  (i) => i.demoItemsId === item.demoItemsId,
                )?.response;
                return (
                  <Col
                    className="mb-3 print-col"
                    key={item.demoItemsId}
                    xs={12}
                    md={6}
                    lg={3}
                  >
                    <div
                      className="d-flex flex-column align-items-center justify-content-center p-2"
                      style={{
                        border: "1px solid lightgray",
                        borderRadius: "5px",
                        minHeight: "80px", // Altura mínima para uniformidad
                        height: "100%",
                      }}
                    >
                      {item.itemType !== "checkbox" && (
                        <Form.Label
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          {item.itemDescription}
                        </Form.Label>
                      )}

                      {item.itemType === "yes/no" && (
                        <div className="d-flex justify-content-center">
                          <Form.Check
                            inline
                            type="radio"
                            label="Yes"
                            name={`item-${item.demoItemsId}`}
                            id={`yes-${item.demoItemsId}`}
                            checked={currentResponse === "yes"}
                            onChange={() =>
                              setItemResponse(item.demoItemsId, "yes")
                            }
                          />
                          <Form.Check
                            inline
                            type="radio"
                            label="No"
                            name={`item-${item.demoItemsId}`}
                            id={`no-${item.demoItemsId}`}
                            checked={currentResponse === "no"}
                            onChange={() =>
                              setItemResponse(item.demoItemsId, "no")
                            }
                          />
                        </div>
                      )}

                      {/* TIPO: TEXT */}
                      {item.itemType === "text" && (
                        <Form.Control
                          size="sm"
                          type="text"
                          placeholder="..."
                          value={currentResponse || ""}
                          onChange={(e) =>
                            setItemResponse(item.demoItemsId, e.target.value)
                          }
                        />
                      )}

                      {/* TIPO: CHECKBOX (Aquí usamos la descripción como label del check) */}
                      {item.itemType === "checkbox" && (
                        <Form.Check
                          type="switch"
                          id={`check-${item.demoItemsId}`}
                          label={item.itemDescription} // <-- La descripción va aquí
                          style={{ fontWeight: "bold", fontSize: "14px" }}
                          checked={
                            currentResponse === "checked" ||
                            currentResponse === "N/A"
                          }
                          onChange={(e) => {
                            const val = e.target.checked ? "N/A" : "";
                            setItemResponse(item.demoItemsId, val);
                          }}
                        />
                      )}

                      {item.itemType === "date" && (
                        <Form.Control
                          size="sm"
                          type="date"
                          id={`check-${item.demoItemsId}`}
                          style={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            textAlign: "center",
                          }}
                          value={currentResponse || ""}
                          onChange={(e) =>
                            setItemResponse(item.demoItemsId, e.target.value)
                          }
                        />
                      )}

                      {item.itemType === "Interior/Complete" && (
                        <div className="d-flex justify-content-center">
                          <Form.Check
                            inline
                            type="radio"
                            label="Interior"
                            name={`item-${item.demoItemsId}`}
                            id={`Interior-${item.demoItemsId}`}
                            checked={currentResponse === "Interior"}
                            onChange={() =>
                              setItemResponse(item.demoItemsId, "Interior")
                            }
                          />
                          <Form.Check
                            inline
                            type="radio"
                            label="Complete"
                            name={`item-${item.demoItemsId}`}
                            id={`Complete-${item.demoItemsId}`}
                            checked={currentResponse === "Complete"}
                            onChange={() =>
                              setItemResponse(item.demoItemsId, "Complete")
                            }
                          />
                        </div>
                      )}

                      {item.itemType === "Wood/Concrete/Metal" && (
                        <div className="d-flex justify-content-center">
                          <Form.Check
                            inline
                            type="radio"
                            label="Wood"
                            name={`item-${item.demoItemsId}`}
                            id={`Wood-${item.demoItemsId}`}
                            checked={currentResponse === "Wood"}
                            onChange={() =>
                              setItemResponse(item.demoItemsId, "Wood")
                            }
                          />
                          <Form.Check
                            inline
                            type="radio"
                            label="Concrete"
                            name={`item-${item.demoItemsId}`}
                            id={`Concrete-${item.demoItemsId}`}
                            checked={currentResponse === "Concrete"}
                            onChange={() =>
                              setItemResponse(item.demoItemsId, "Concrete")
                            }
                          />
                          <Form.Check
                            inline
                            type="radio"
                            label="Metal"
                            name={`item-${item.demoItemsId}`}
                            id={`Metal-${item.demoItemsId}`}
                            checked={currentResponse === "Metal"}
                            onChange={() =>
                              setItemResponse(item.demoItemsId, "Metal")
                            }
                          />
                        </div>
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default Sections;
