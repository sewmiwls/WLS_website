"use client";
import React, { useState } from "react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/user/changePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "admin",
          oldPassword: currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || data.message || "Failed to change password.");
      } else {
        setMessage("Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 border border-slate-700 rounded-xl p-8 w-full max-w-md mx-auto text-white"
    >
      <h3 className="text-xl font-semibold mb-4">Change Password</h3>
      <p className="text-slate-300 mb-6">
        For your security, please change your password now.
      </p>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col text-sm text-slate-300">
          Current Password
          <input
            type="password"
            name="currentPassword"
            className="mt-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        <label className="flex flex-col text-sm text-slate-300">
          New Password
          <input
            type="password"
            name="newPassword"
            className="mt-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label className="flex flex-col text-sm text-slate-300">
          Confirm New Password
          <input
            type="password"
            name="confirmPassword"
            className="mt-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>

        {message && (
          <div className="text-center text-sm mt-2 text-red-400">{message}</div>
        )}
      </div>
    </form>
  );
};

export default ChangePassword;
