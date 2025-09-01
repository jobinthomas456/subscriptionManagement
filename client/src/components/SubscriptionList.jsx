export default function SubscriptionList({
  subscriptions = [],
  onDelete,
  onToggleShared,
}) {
  const list = Array.isArray(subscriptions) ? subscriptions : [];

  if (list.length === 0) {
    return <p className="text-gray-500 text-center mt-4">No subscriptions available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {list.map((sub) => (
        <div
          key={sub._id}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-200"
        >
          <div>
            <h2 className="text-lg font-semibold mb-1">{sub.serviceName}</h2>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Cost:</span> ${sub.cost} / {sub.billingCycle}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Renewal:</span>{" "}
              {new Date(sub.renewalDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Notes:</span> {sub.notes || "None"}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Shared:</span> {sub.shared ? "Yes" : "No"}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">User:</span> {sub.user?.name || "You"}
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            {onToggleShared && (
              <button
                onClick={() => onToggleShared(sub._id, !sub.shared)}
                className={`px-3 py-1 rounded text-white ${
                  sub.shared ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"
                } transition-colors`}
              >
                Toggle Shared
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(sub._id)}
                className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
