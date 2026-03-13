const AlertApp = ({ message }) => {
  return (
    <div className="alert alert-danger d-flex align-items-center mt-2" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>

      <div>
        <p className="mb-0">{message}</p>
      </div>
    </div>
  );
};

export default AlertApp;
