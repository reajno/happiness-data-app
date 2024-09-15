import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AlertModal({
  variant = "danger",
  message,
  prevOnClose,
  onClose,
  dismissible = true,
}) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {message && (
        <Alert
          className="w-100 text-center"
          variant={variant}
          onClose={prevOnClose ? handleGoBack : onClose}
          dismissible={dismissible}
        >
          {message}
        </Alert>
      )}
    </>
  );
}
