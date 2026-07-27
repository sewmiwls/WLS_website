"use client";
import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { X, Save, Eye, FileText, Settings, Code } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });


interface PageFormProps {
  pageId?: string;
  onClose: () => void;
  onSave: () => void;
}

const PageForm = ({ pageId, onClose, onSave }: PageFormProps) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "advanced">(
    "content"
  );
  const [allPages, setAllPages] = useState<{ id: string; title: string }[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    content: "",
    metaDescription: "",
    metaKeywords: [] as string[],
    published: false,
    layout: "default",
    showInNav: false,
    navOrder: 0,
    parentPageId: "",
    featuredImage: "",
    customCss: "",
    customJs: "",
  });

  // Keyword input state
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    fetchAllPages();
    if (pageId) {
      fetchPageData();
    }
  }, [pageId]);

  const fetchAllPages = async () => {
    try {
      const response = await fetch("/api/admin/pages");
      const data = await response.json();
      setAllPages(
        data
          .filter((p: any) => p.id !== pageId)
          .map((p: any) => ({ id: p.id, title: p.title }))
      );
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  const fetchPageData = async () => {
    try {
      const response = await fetch(`/api/admin/pages?id=${pageId}`);
      const data = await response.json();
      if (data) {
        setFormData({
          slug: data.slug || "",
          title: data.title || "",
          content: data.content || "",
          metaDescription: data.metaDescription || "",
          metaKeywords: data.metaKeywords || [],
          published: data.published || false,
          layout: data.layout || "default",
          showInNav: data.showInNav || false,
          navOrder: data.navOrder || 0,
          parentPageId: data.parentPageId || "",
          featuredImage: data.featuredImage || "",
          customCss: data.customCss || "",
          customJs: data.customJs || "",
        });
      }
    } catch (error) {
      console.error("Error fetching page:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = pageId ? "PUT" : "POST";
      
      // Clean up the data - convert empty strings to null where appropriate
      const cleanedData = {
        ...formData,
        parentPageId: formData.parentPageId || null,
        featuredImage: formData.featuredImage || null,
        customCss: formData.customCss || null,
        customJs: formData.customJs || null,
        metaDescription: formData.metaDescription || null,
      };
      
      const body = pageId ? { ...cleanedData, id: pageId } : cleanedData;

      console.log("Submitting page data:", body); // Debug log

      const response = await fetch("/api/admin/pages", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        onSave();
        onClose();
      } else {
        const error = await response.json();
        console.error("Server error:", error); // Debug log
        alert(`Failed to save page: ${error.details || error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving page:", error);
      alert("Failed to save page. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const addKeyword = () => {
    if (keywordInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        metaKeywords: [...prev.metaKeywords, keywordInput.trim()],
      }));
      setKeywordInput("");
    }
  };

  const removeKeyword = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      metaKeywords: prev.metaKeywords.filter((_, i) => i !== index),
    }));
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          // { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    // "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-6xl my-8">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">
              {pageId ? "Edit Page" : "Create New Page"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab("content")}
            className={`px-6 py-3 font-medium transition ${
              activeTab === "content"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Content
            </div>
          </button>
          <button
            onClick={() => setActiveTab("seo")}
            className={`px-6 py-3 font-medium transition ${
              activeTab === "seo"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              SEO & Settings
            </div>
          </button>
          <button
            onClick={() => setActiveTab("advanced")}
            className={`px-6 py-3 font-medium transition ${
              activeTab === "advanced"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Advanced
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
            {/* Content Tab */}
            {activeTab === "content" && (
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    URL Slug *
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    URL-friendly version of the title
                  </p>
                </div>

                {/* WYSIWYG Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Page Content *
                  </label>
                  <div className="bg-white rounded-lg">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(content: string) =>
                        setFormData({ ...formData, content })
                      }
                      modules={modules}
                      formats={formats}
                      className="h-96"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Use the toolbar to format your content, add links, images,
                    and more
                  </p>
                </div>

                {/* Featured Image */}
                <div className="mt-16">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.featuredImage}
                    onChange={(e) =>
                      setFormData({ ...formData, featuredImage: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                {/* Meta Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metaDescription: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    rows={3}
                    placeholder="Brief description for search engines (150-160 characters)"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {formData.metaDescription.length} characters
                  </p>
                </div>

                {/* Meta Keywords */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Meta Keywords
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addKeyword();
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="Add a keyword and press Enter"
                    />
                    <button
                      type="button"
                      onClick={addKeyword}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.metaKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-700 text-white rounded-full text-sm flex items-center gap-2"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeKeyword(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Layout */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Page Layout
                  </label>
                  <select
                    value={formData.layout}
                    onChange={(e) =>
                      setFormData({ ...formData, layout: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="default">Default</option>
                    <option value="full-width">Full Width</option>
                    <option value="sidebar">With Sidebar</option>
                    <option value="landing">Landing Page</option>
                  </select>
                </div>

                {/* Navigation Settings */}
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showInNav}
                      onChange={(e) =>
                        setFormData({ ...formData, showInNav: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-300">
                      Show in Navigation
                    </span>
                  </label>

                  {formData.showInNav && (
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-slate-300">Order:</label>
                      <input
                        type="number"
                        value={formData.navOrder}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            navOrder: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-20 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>

                {/* Parent Page */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Parent Page (Optional)
                  </label>
                  <select
                    value={formData.parentPageId}
                    onChange={(e) =>
                      setFormData({ ...formData, parentPageId: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">None (Top Level)</option>
                    {allPages.map((page) => (
                      <option key={page.id} value={page.id}>
                        {page.title}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-500 mt-1">
                    Create a page hierarchy for better organization
                  </p>
                </div>

                {/* Published Toggle */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="published" className="text-sm text-slate-300">
                    Publish this page
                  </label>
                </div>
              </div>
            )}

            {/* Advanced Tab */}
            {activeTab === "advanced" && (
              <div className="space-y-6">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-400 text-sm">
                    ⚠️ Advanced settings - use with caution. Custom CSS and
                    JavaScript will be injected into this page only.
                  </p>
                </div>

                {/* Custom CSS */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Custom CSS
                  </label>
                  <textarea
                    value={formData.customCss}
                    onChange={(e) =>
                      setFormData({ ...formData, customCss: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                    rows={10}
                    placeholder=".custom-class {&#10;  color: #3b82f6;&#10;}"
                  />
                </div>

                {/* Custom JS */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Custom JavaScript
                  </label>
                  <textarea
                    value={formData.customJs}
                    onChange={(e) =>
                      setFormData({ ...formData, customJs: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                    rows={10}
                    placeholder="console.log('Hello from custom JS');"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 p-6 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-slate-400 hover:text-white transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <Save className="w-4 h-4" />
              {loading ? "Saving..." : pageId ? "Update Page" : "Create Page"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageForm;
