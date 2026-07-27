"use client";
import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Eye, EyeOff, FileText } from "lucide-react";

interface Page {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  showInNav: boolean;
  createdAt: string;
}

const PageList = ({
  onEdit,
  onNew,
}: {
  onEdit: (id: string) => void;
  onNew: () => void;
}) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/admin/pages");
      const data = await response.json();
      setPages(data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;

    try {
      const response = await fetch(`/api/admin/pages?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPages();
      }
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  const togglePublish = async (page: Page) => {
    try {
      const response = await fetch("/api/admin/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: page.id,
          published: !page.published,
          slug: page.slug,
          title: page.title,
          content: "", // Will be preserved from existing
        }),
      });

      if (response.ok) {
        fetchPages();
      }
    } catch (error) {
      console.error("Error toggling publish:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Pages</h2>
          <p className="text-slate-400 text-sm mt-1">
            Create SEO pages, landing pages, backlinks, and more
          </p>
        </div>
        <button
          onClick={onNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          New Page
        </button>
      </div>

      <div className="grid gap-4">
        {pages.map((page) => (
          <div
            key={page.id}
            className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">
                    {page.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      page.published
                        ? "bg-green-500/20 text-green-400"
                        : "bg-slate-600/20 text-slate-400"
                    }`}
                  >
                    {page.published ? "Published" : "Draft"}
                  </span>
                  {page.showInNav && (
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
                      In Navigation
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-xs">
                  URL: /{page.slug}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => togglePublish(page)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition"
                  title={page.published ? "Unpublish" : "Publish"}
                >
                  {page.published ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => onEdit(page.id)}
                  className="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700/50 rounded-lg transition"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(page.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700/50 rounded-lg transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {pages.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No pages yet. Create your first SEO-optimized page!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageList;
