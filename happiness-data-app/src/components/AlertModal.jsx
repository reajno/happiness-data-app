import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AlertModal({ message, prevOnClose, onClose }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {message && (
        <Alert
          variant="danger"
          onClose={prevOnClose ? handleGoBack : onClose}
          dismissible
        >
          {message}
        </Alert>
      )}
    </>
  );
}
