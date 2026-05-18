export default function NotificationCard({
  notification,
  index,
}) {
  function getColor(type) {
    if (type === "Placement") {
      return "#16a34a";
    }

    if (type === "Result") {
      return "#2563eb";
    }

    return "#ea580c";
  }

  return (
    <div className="card">
      <div className="top-section">
        <div>
          <h2>#{index + 1}</h2>

          <span
            className="badge"
            style={{
              backgroundColor: getColor(notification.Type),
            }}
          >
            {notification.Type}
          </span>

          <h3>{notification.Message}</h3>

          <p>
            <strong>ID:</strong> {notification.ID}
          </p>

          <p>
            <strong>Timestamp:</strong>{" "}
            {notification.Timestamp}
          </p>
        </div>

        <div className="score-box">
          <p>Priority</p>

          <h1>{notification.priorityScore}</h1>
        </div>
      </div>
    </div>
  );
}