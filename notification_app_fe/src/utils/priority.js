
const weights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function getPriorityScore(notification) {
  const type = notification.Type;

  const weight = weights[type] || 1;

  const currentTime = new Date();

  const notificationTime = new Date(notification.Timestamp);

  const timeDifference =
    (currentTime.getTime() - notificationTime.getTime()) / 1000;

  const recentScore = Math.max(0, 100000 - timeDifference);

  return weight * 1000 + Math.floor(recentScore);
}

