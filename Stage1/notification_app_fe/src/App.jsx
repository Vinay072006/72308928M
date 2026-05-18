import { useEffect, useState } from "react";

import NotificationCard from "./components/NotificationCard";

import { fetchNotifications } from "./services/api";

import { getPriorityScore } from "./utils/priority";

export default function App() {
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [count, setCount] = useState(10);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    setLoading(true);

    const data = await fetchNotifications();

    const updatedNotifications = data.map((item) => ({
      ...item,
      priorityScore: getPriorityScore(item),
    }));

    updatedNotifications.sort((a, b) => {
      return b.priorityScore - a.priorityScore;
    });

    setNotifications(updatedNotifications);

    setLoading(false);
  }

  return (
    <div className="container">
      <h1 className="title">
        Priority Inbox Notification System
      </h1>

      <div className="controls">
        <button onClick={loadNotifications}>
          Refresh Notifications
        </button>

        <div>
          <label>Show Top : </label>

          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            <option value={5}>5</option>

            <option value={10}>10</option>

            <option value={15}>15</option>

            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {loading ? (
        <h2>Loading notifications...</h2>
      ) : (
        notifications
          .slice(0, count)
          .map((notification, index) => (
            <NotificationCard
              key={notification.ID}
              notification={notification}
              index={index}
            />
          ))
      )}
    </div>
  );
}