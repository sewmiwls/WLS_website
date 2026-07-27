"use client";
import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Eye, EyeOff } from "lucide-react";

interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  title: string;
  published: boolean;
  createdAt: string;
}

const CaseStudyList = ({
  onEdit,
  onNew,
}: {
  onEdit: (id: string) => void;
  onNew: () => void;
}) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch("/api/admin/case-studies");
      const data = await response.json();
      setCaseStudies(data);
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;

    try {
      const response = await fetch(`/api/admin/case-studies?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCaseStudies();
      }
    } catch (error) {
      console.error("Error deleting case study:", error);
    }
  };

  const togglePublish = async (caseStudy: CaseStudy) => {
    try {
      const response = await fetch("/api/admin/case-studies", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: caseStudy.id,
          published: !caseStudy.published,
          slug: caseStudy.slug,
          client: caseStudy.client,
          title: caseStudy.title,
        }),
      });

      if (response.ok) {
        fetchCaseStudies();
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
        <h2 className="text-2xl font-bold text-white">Case Studies</h2>
        <button
          onClick={onNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          New Case Study
        </button>
      </div>

      <div className="grid gap-4">
        {caseStudies.map((study) => (
          <div
            key={study.id}
            className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {study.client}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      study.published
                        ? "bg-green-500/20 text-green-400"
                        : "bg-slate-600/20 text-slate-400"
                    }`}
                  >
                    {study.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-slate-300 text-sm mb-1">{study.title}</p>
                <p className="text-slate-500 text-xs">Slug: /{study.slug}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => togglePublish(study)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition"
                  title={study.published ? "Unpublish" : "Publish"}
                >
                  {study.published ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => onEdit(study.id)}
                  className="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700/50 rounded-lg transition"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(study.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700/50 rounded-lg transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {caseStudies.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            No case studies yet. Create your first one!
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudyList;
