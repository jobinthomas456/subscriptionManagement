export default function SubscriptionList({ subscriptions = [], onDelete, onToggleShared }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {subscriptions.map((sub) => (
        <li
          key={sub._id}
          className="border p-4 rounded shadow-md flex flex-col justify-between"
        >
          <div className="mb-2">
            <strong className="text-lg">{sub.serviceName}</strong> - ${sub.cost} / {sub.billingCycle}
          </div>

          <div className="mb-2 text-sm">
            <p>Renewal: {new Date(sub.renewalDate).toLocaleDateString()}</p>
            <p>Notes: {sub.notes}</p>
            <p>Shared: {sub.shared ? "Yes" : "No"}</p>
            {/* Display user name if available */}
            <p>User: {sub.user?.name || "You"}</p>
          </div>

          <div className="flex gap-2 mt-2">
            {onToggleShared && (
              <button
                onClick={() => onToggleShared(sub._id, !sub.shared)}
                className="bg-yellow-500 px-2 py-1 rounded"
              >
                Toggle Shared
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(sub._id)}
                className="bg-red-500 px-2 py-1 rounded"
              >
                Delete
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
