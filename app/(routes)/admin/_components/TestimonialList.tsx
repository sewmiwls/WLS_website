import Loader from "@/components/Loader";
import { PlusIcon, Star } from "lucide-react";
import React, { memo, useEffect, useState } from "react";

const TestimonialsList = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [authorId, setAuthorId] = useState<string>("");
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  const fetchTestimonialsAndUsers = async () => {
    setLoading(true);
    const [testimonialsRes, usersRes] = await Promise.all([
      fetch("/api/testimonials"),
      fetch("/api/user"),
    ]);
    const testimonialsData = await testimonialsRes.json();
    const usersData = await usersRes.json();
    setTestimonials(testimonialsData || []);
    setUsers(usersData || []);
    setLoading(false);
  };
  useEffect(() => {
    fetchTestimonialsAndUsers();
  }, []);

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-white text-xl font-bold mb-4">Testimonials</h2>
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
              <h3 className="text-white text-lg font-bold mb-4">
                Add Testimonials
              </h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormLoading(true);
                  setFormError("");
                  // set authorId from cookies
                  const authorIdCookie = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("admin_id="));
                  if (authorIdCookie) {
                    setAuthorId(authorIdCookie.split("=")[1]);
                  }
                  try {
                    console.log({ name, content, authorId });

                    const res = await fetch("/api/testimonials", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ name, content, authorId }),
                    });
                    if (!res.ok) {
                      const err = await res.json();
                      throw new Error(
                        err.message || "Failed to create testimonial"
                      );
                    }
                    setShowForm(false);
                    setName("");
                    setContent("");
                    // Refresh list
                    fetchTestimonialsAndUsers();
                    const data = await res.json();
                    setTestimonials((prev) => [...prev, data]);
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
                    Title
                  </label>
                  <input
                    aria-label="Title"
                    className="w-full px-3 py-2 rounded bg-slate-700 text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-1">
                    Content
                  </label>
                  <textarea
                    aria-label="content"
                    className="w-full h-[300px] px-3 py-2 rounded bg-slate-700 text-white"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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
                  {formLoading ? "Posting..." : "Post Testimonial"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {loading && <Loader className="h-8 w-8 mx-auto my-4 text-slate-400" />}
      {!loading && testimonials.length === 0 && (
        <div className="text-center text-slate-400">No testimonials found.</div>
      )}
      {!loading && testimonials.length > 0 && (
        <ul className="divide-y divide-slate-700">
          {testimonials.map((t, i) => (
            <li
              key={i}
              className="py-4 flex items-start p-4 space-x-4 hover:bg-slate-700/30 rounded-lg transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold text-base">
                    {t.title}
                  </h4>
                </div>
                <p className="text-slate-300 mt-1">{t.content}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="text-slate-400 text-xs">
                    {users.find(
                      (u: { id: string | null | undefined; name: string }) =>
                        u.id === t.authorId
                    )?.name || "Anonymous"}
                  </span>
                  {t.date && (
                    <span className="text-slate-500 text-xs">
                      • {new Date(t.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(TestimonialsList);
