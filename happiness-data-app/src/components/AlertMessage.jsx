import { Alert } from "react-bootstrap";

export default function AlertMessage({
  variant = "danger",
  message,
  className,
}) {
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
