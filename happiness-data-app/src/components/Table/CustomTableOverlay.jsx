
export default function CustomTableOverlay({ message }) {
  return (
    <div className="ag-overlay-no-rows-center">
      {message ? <span>{message}</span> : null}
    </div>
  );
}
