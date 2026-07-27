import Loader from "@/components/Loader";
import { PlusIcon } from "lucide-react";
import React, { memo, useEffect, useState } from "react";

const UsersList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await fetch("/api/user");
      const data = await res.json();
      setUsers(data || []);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-white text-xl font-bold mb-4">Users</h2>
        <button
          title="Add User"
          onClick={() => setShowForm(true)}
          className="p-2 hover:bg-slate-700/30 rounded-full transition-colors"
        >
          <PlusIcon />
        </button>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-slate-800 p-6 rounded-xl w-full max-w-sm shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-slate-400 hover:text-white"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-white text-lg font-bold mb-4">Add User</h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormLoading(true);
                  setFormError("");
                  try {
                    const res = await fetch("/api/user", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ name, email, password }),
                    });
                    if (!res.ok) {
                      const err = await res.json();
                      throw new Error(err.message || "Failed to create user");
                    }
                    setShowForm(false);
                    setName("");
                    setEmail("");
                    setPassword("");
                    // Refresh users list
                    const data = await res.json();
                    setUsers((prev) => [...prev, data]);
                  } catch (err: any) {
                    setFormError(err.message);
                  } finally {
                    setFormLoading(false);
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-slate-300 text-sm mb-1">
                    Name
                  </label>
                  <input
                    aria-label="Name"
                    className="w-full px-3 py-2 rounded bg-slate-700 text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-1">
                    Email
                  </label>
                  <input
                    aria-label="Email"
                    className="w-full px-3 py-2 rounded bg-slate-700 text-white"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-1">
                    Password
                  </label>
                  <input
                    aria-label="Password"
                    className="w-full px-3 py-2 rounded bg-slate-700 text-white"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {formError && (
                  <div className="text-red-400 text-sm">{formError}</div>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors"
                  disabled={formLoading}
                >
                  {formLoading ? "Creating..." : "Create User"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {loading && <Loader className="h-8 w-8 mx-auto my-4 text-slate-400" />}
      {!loading && users.length === 0 && (
        <div className="text-center text-slate-400">No users found.</div>
      )}
      {!loading && users.length > 0 && (
        <div className="text-sm text-slate-500 mb-4">
          Total Users: {users.length}
        </div>
      )}
      {!loading && users.length > 0 && (
        <ul className="divide-y divide-slate-700">
          {users.map((u, i) => (
            <li
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-2 hover:bg-slate-700/30 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg uppercase">
                  {u.name?.[0] || "?"}
                </div>
                <div>
                  <p className="text-white font-medium">
                    {u.name || "Unnamed"}
                  </p>
                  <p className="text-slate-400 text-xs">
                    {u.email || "No email"}
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-2 sm:mt-0 space-x-2">
                {/* {u.role && (
                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-700 text-blue-200">
                    {u.role}
                  </span>
                )} */}
                {u.createdAt && (
                  <span className="text-slate-500 text-xs">
                    Joined {new Date(u.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(UsersList);
