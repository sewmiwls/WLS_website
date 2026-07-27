"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { X, Plus, Trash2 } from "lucide-react";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface CaseStudyFormProps {
  caseStudyId?: string;
  onClose: () => void;
  onSave: () => void;
}

const CaseStudyForm: React.FC<CaseStudyFormProps> = ({
  caseStudyId,
  onClose,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    published: false,
    client: "",
    website: "",
    title: "",
    subtitle: "",
    primaryMetricValue: "",
    primaryMetricLabel: "",
    timeline: "",
    tags: [] as string[],
    overviewChallenge: "",
    overviewSolution: "",
    overviewResults: "",
    clientDescription: [] as string[],
    clientGoals: [] as string[],
    planDescription: [] as string[],
    planApproach: [] as string[],
    executionDescription: "",
    executionStrategies: [] as { title: string; description: string }[],
    resultsDescription: "",
    resultsMetrics: [] as {
      value: string;
      label: string;
      description?: string;
    }[],
    beforeText: "",
    beforeImageUrl: "",
    afterText: "",
    afterImageUrl: "",
  });

  const [newTag, setNewTag] = useState("");
  const [newClientDesc, setNewClientDesc] = useState("");
  const [newClientGoal, setNewClientGoal] = useState("");
  const [newPlanDesc, setNewPlanDesc] = useState("");
  const [newPlanApproach, setNewPlanApproach] = useState("");

  useEffect(() => {
    if (caseStudyId) {
      fetchCaseStudy();
    }
  }, [caseStudyId]);

  const fetchCaseStudy = async () => {
    try {
      const response = await fetch("/api/admin/case-studies");
      const data = await response.json();
      const study = data.find((s: any) => s.id === caseStudyId);
      if (study) {
        setFormData(study);
      }
    } catch (error) {
      console.error("Error fetching case study:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = caseStudyId ? "PUT" : "POST";
      const body = caseStudyId ? { ...formData, id: caseStudyId } : formData;

      const response = await fetch("/api/admin/case-studies", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        onSave();
        onClose();
      }
    } catch (error) {
      console.error("Error saving case study:", error);
    } finally {
      setLoading(false);
    }
  };

  const addArrayItem = (field: string, value: string) => {
    if (!value.trim()) return;
    setFormData({
      ...formData,
      [field]: [...(formData[field as keyof typeof formData] as string[]), value],
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData({
      ...formData,
      [field]: (formData[field as keyof typeof formData] as string[]).filter(
        (_, i) => i !== index
      ),
    });
  };

  const addStrategy = () => {
    setFormData({
      ...formData,
      executionStrategies: [
        ...formData.executionStrategies,
        { title: "", description: "" },
      ],
    });
  };

  const updateStrategy = (index: number, field: string, value: string) => {
    const strategies = [...formData.executionStrategies];
    strategies[index] = { ...strategies[index], [field]: value };
    setFormData({ ...formData, executionStrategies: strategies });
  };

  const removeStrategy = (index: number) => {
    setFormData({
      ...formData,
      executionStrategies: formData.executionStrategies.filter(
        (_, i) => i !== index
      ),
    });
  };

  const addMetric = () => {
    setFormData({
      ...formData,
      resultsMetrics: [
        ...formData.resultsMetrics,
        { value: "", label: "", description: "" },
      ],
    });
  };

  const updateMetric = (index: number, field: string, value: string) => {
    const metrics = [...formData.resultsMetrics];
    metrics[index] = { ...metrics[index], [field]: value };
    setFormData({ ...formData, resultsMetrics: metrics });
  };

  const removeMetric = (index: number) => {
    setFormData({
      ...formData,
      resultsMetrics: formData.resultsMetrics.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-5xl mx-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {caseStudyId ? "Edit" : "Create"} Case Study
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.client}
                  onChange={(e) =>
                    setFormData({ ...formData, client: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Website
                </label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    })
                  }
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="example-slug"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Timeline
                </label>
                <input
                  type="text"
                  value={formData.timeline}
                  onChange={(e) =>
                    setFormData({ ...formData, timeline: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12 months"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Subtitle *
              </label>
              <input
                type="text"
                required
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Primary Metric Value *
                </label>
                <input
                  type="text"
                  required
                  value={formData.primaryMetricValue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      primaryMetricValue: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="235.86%"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Primary Metric Label *
                </label>
                <input
                  type="text"
                  required
                  value={formData.primaryMetricLabel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      primaryMetricLabel: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Increase in Organic Keywords"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addArrayItem("tags", newTag);
                      setNewTag("");
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a tag and press Enter"
                />
                <button
                  type="button"
                  onClick={() => {
                    addArrayItem("tags", newTag);
                    setNewTag("");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  title="Add tag"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeArrayItem("tags", index)}
                      className="text-slate-400 hover:text-white"
                      title="Remove tag"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Overview Section */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Overview Section
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Challenge
                  </label>
                  <textarea
                    value={formData.overviewChallenge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        overviewChallenge: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What problem did the client face?"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Solution
                  </label>
                  <textarea
                    value={formData.overviewSolution}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        overviewSolution: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What approach was taken?"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Results
                  </label>
                  <textarea
                    value={formData.overviewResults}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        overviewResults: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What was achieved?"
                  />
                </div>
              </div>
            </div>

            {/* Client Section */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Client Section
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Client Description (Paragraphs)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <textarea
                      value={newClientDesc}
                      onChange={(e) => setNewClientDesc(e.target.value)}
                      rows={2}
                      className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add a description paragraph"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        addArrayItem("clientDescription", newClientDesc);
                        setNewClientDesc("");
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 self-start"
                      title="Add description"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.clientDescription.map((desc, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 bg-slate-700/30 p-3 rounded-lg"
                      >
                        <p className="flex-1 text-slate-300 text-sm">{desc}</p>
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem("clientDescription", index)
                          }
                          className="text-red-400 hover:text-red-300"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Client Goals
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newClientGoal}
                      onChange={(e) => setNewClientGoal(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addArrayItem("clientGoals", newClientGoal);
                          setNewClientGoal("");
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add a goal and press Enter"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        addArrayItem("clientGoals", newClientGoal);
                        setNewClientGoal("");
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      title="Add goal"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.clientGoals.map((goal, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
                      >
                        {goal}
                        <button
                          type="button"
                          onClick={() => removeArrayItem("clientGoals", index)}
                          className="text-slate-400 hover:text-white"
                          title="Remove goal"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Section */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Plan Section
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Plan Description (Paragraphs)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <textarea
                      value={newPlanDesc}
                      onChange={(e) => setNewPlanDesc(e.target.value)}
                      rows={2}
                      className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add a plan paragraph"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        addArrayItem("planDescription", newPlanDesc);
                        setNewPlanDesc("");
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 self-start"
                      title="Add description"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.planDescription.map((desc, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 bg-slate-700/30 p-3 rounded-lg"
                      >
                        <p className="flex-1 text-slate-300 text-sm">{desc}</p>
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem("planDescription", index)
                          }
                          className="text-red-400 hover:text-red-300"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Plan Approach Points
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newPlanApproach}
                      onChange={(e) => setNewPlanApproach(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addArrayItem("planApproach", newPlanApproach);
                          setNewPlanApproach("");
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add an approach point and press Enter"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        addArrayItem("planApproach", newPlanApproach);
                        setNewPlanApproach("");
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      title="Add approach"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.planApproach.map((approach, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
                      >
                        {approach}
                        <button
                          type="button"
                          onClick={() => removeArrayItem("planApproach", index)}
                          className="text-slate-400 hover:text-white"
                          title="Remove approach"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Execution Description */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Execution Section
              </h3>
              <div className="mb-4">
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Execution Description
                </label>
                <textarea
                  value={formData.executionDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      executionDescription: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Overview of execution strategy"
                />
              </div>
            </div>

            {/* Execution Strategies */}
            <div className="border-t border-slate-700 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Execution Strategies
                </h3>
                <button
                  type="button"
                  onClick={addStrategy}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Strategy
                </button>
              </div>
              <div className="space-y-4">
                {formData.executionStrategies.map((strategy, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/30 p-4 rounded-lg space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <input
                        type="text"
                        value={strategy.title}
                        onChange={(e) =>
                          updateStrategy(index, "title", e.target.value)
                        }
                        placeholder="Strategy Title"
                        className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeStrategy(index)}
                        className="ml-2 p-2 text-red-400 hover:text-red-300"
                        title="Remove strategy"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      value={strategy.description}
                      onChange={(e) =>
                        updateStrategy(index, "description", e.target.value)
                      }
                      placeholder="Strategy Description"
                      rows={3}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Results Description */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Results Section
              </h3>
              <div className="mb-4">
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Results Description
                </label>
                <textarea
                  value={formData.resultsDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      resultsDescription: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Overview of results achieved"
                />
              </div>
            </div>

            {/* Results Metrics */}
            <div className="border-t border-slate-700 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Results Metrics
                </h3>
                <button
                  type="button"
                  onClick={addMetric}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Metric
                </button>
              </div>
              <div className="space-y-4">
                {formData.resultsMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/30 p-4 rounded-lg space-y-3"
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={metric.value}
                        onChange={(e) =>
                          updateMetric(index, "value", e.target.value)
                        }
                        placeholder="235.86%"
                        className="w-1/3 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={metric.label}
                        onChange={(e) =>
                          updateMetric(index, "label", e.target.value)
                        }
                        placeholder="Metric Label"
                        className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeMetric(index)}
                        className="p-2 text-red-400 hover:text-red-300"
                        title="Remove metric"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      value={metric.description}
                      onChange={(e) =>
                        updateMetric(index, "description", e.target.value)
                      }
                      placeholder="Metric Description (optional)"
                      rows={2}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Before/After */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Before/After Section
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-slate-300 text-sm font-medium">
                    Before Text
                  </label>
                  <textarea
                    value={formData.beforeText}
                    onChange={(e) =>
                      setFormData({ ...formData, beforeText: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Description before your work"
                  />
                  <input
                    type="text"
                    value={formData.beforeImageUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        beforeImageUrl: e.target.value,
                      })
                    }
                    placeholder="Before Image URL (e.g., /images/before.png)"
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-slate-300 text-sm font-medium">
                    After Text
                  </label>
                  <textarea
                    value={formData.afterText}
                    onChange={(e) =>
                      setFormData({ ...formData, afterText: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Description after your work"
                  />
                  <input
                    type="text"
                    value={formData.afterImageUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        afterImageUrl: e.target.value,
                      })
                    }
                    placeholder="After Image URL (e.g., /images/after.png)"
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center gap-3 border-t border-slate-700 pt-6">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="published" className="text-slate-300">
                Publish immediately
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : caseStudyId ? "Update" : "Create"} Case
                Study
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyForm;
