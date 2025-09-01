export default function UserList({ users = [], onEdit, onDelete }) {
  if (!Array.isArray(users) || users.length === 0)
    return <p className="text-gray-500">No users found.</p>;

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map(user => (
        <li key={user._id} className="border p-4 rounded shadow hover:shadow-md bg-white">
          <div><strong>{user.name}</strong></div>
          <div>{user.email}</div>
          <div>Role: {user.role}</div>
          <div className="flex gap-2 mt-2">
            <button onClick={() => onEdit(user)} className="bg-yellow-500 px-2 py-1 rounded">Edit</button>
            <button onClick={() => onDelete(user._id)} className="bg-red-500 px-2 py-1 rounded">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
