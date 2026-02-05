import { Spinner } from "react-bootstrap";
import Layout from "./Layout";
import { useMutationState } from "@tanstack/react-query";

function Home() {

  const isSaving = useMutationState({
    filters: { mutationKey: ["save-report"], status: "pending" },
    select: (mutation) => mutation.state.status === "pending",
  }).some(Boolean);
  
  return (
    <>
      <Layout />
      {isSaving && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "4rem", height: "4rem" }}
          />
          <h4 className="mt-3">Saving Report...</h4>
        </div>
      )}
    </>
  );
}

export default Home;
