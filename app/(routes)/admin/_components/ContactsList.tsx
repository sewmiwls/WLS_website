"use client";
import { useState, useEffect, memo } from "react";
import Loader from "@/components/Loader";

const ContactsList = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    let isMounted;
    const fetchContacts = async () => {
      isMounted = true;
      setLoading(true);
      if (isMounted) {
        const res = await fetch("/api/contact?limit=100");
        const data = await res.json();
        setContacts(data.contacts || []);
        setLoading(false);
      }
    };
    fetchContacts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
      <h2 className="text-white text-xl font-bold mb-4">Contact Submissions</h2>
      {loading && <Loader className="h-8 w-8 mx-auto my-4 text-slate-400" />}
      {!loading && contacts.length === 0 && (
        <div className="text-center text-slate-400">
          No contact submissions found.
        </div>
      )}
      {!loading && contacts.length > 0 && (
        <ul className="divide-y divide-slate-700">
          {contacts.map((c, i) => (
            <li
              key={i}
              className="py-3 text-white font-poppins flex sm:flex-row flex-col justify-between items-center hover:bg-slate-700/30 px-4 transition-colors"
            >
              <div>
                <p>
                  <strong>{c.name}</strong> - {c.email}
                </p>
                <p className="text-sm text-slate-400">{c.subject}</p>
                <p className="text-sm">{c.message}</p>
              </div>
              <a
                href={`mailto:${c.email}`}
                className="hover:bg-slate-700/70 py-2 px-4 rounded-full"
              >
                Reply
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(ContactsList);
