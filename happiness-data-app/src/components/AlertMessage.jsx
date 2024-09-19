import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AlertMessage({
  variant = "danger",
  message,
  className,
}) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {message && (
        <Alert className={`w-100 text-center ${className}`} variant={variant}>
          {message}
        </Alert>
      )}
    </>
  );
}
