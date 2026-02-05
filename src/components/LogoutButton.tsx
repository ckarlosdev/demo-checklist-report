import { Button } from "react-bootstrap";
import { api } from "../hooks/apiConfig";
import { useState } from "react";
import { useAuthStore } from "../hooks/authStore";
import useReportDataStore from "../stores/useReportDataStore";
import { useContextStore } from "../stores/useContextStore";

type Props = {};

function LogoutButton({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const { reset } = useReportDataStore();
  const { setIsLoaded } = useContextStore();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      if (refreshToken) {
        await api.post("/auth/revoke", { refreshToken });
      }
    } catch (error) {
      console.error(
        "Error al revocar token, cerrando sesión localmente...",
        error,
      );
    } finally {
      reset();
      logout();
      setIsLoaded(false);
      window.location.href = "https://ckarlosdev.github.io/login/";
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="outline-danger"
      style={{
        borderRadius: "10px",
        fontWeight: "bold",
        width: "120px",
        height: "40px",
      }}
    >
      {isLoading ? <span>Logging out</span> : <>Logout</>}
      <i className="bi bi-box-arrow-right" style={{ margin: "6px" }}></i>
    </Button>
  );
}

export default LogoutButton;
