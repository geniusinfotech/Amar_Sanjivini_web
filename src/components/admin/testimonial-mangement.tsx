"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { motion } from "framer-motion";
import { Trash2, Edit, CheckCircle, XCircle } from "lucide-react"; // Added new icons

// 💡 IMPORTANT: Replace this placeholder import with the actual path to your useAuth hook.
// Example: import { useAuth } from '@/context/auth-context';
import { useAuth } from "@/context/AuthContext";

// Define the interfaces
interface TestimonialData {
  _id: string;
  text: string;
  image?: string;
  videoLink?: string;
  customerName: string;
  customerPost: string;
  isActive: boolean;
}

interface TestimonialFormData extends Omit<TestimonialData, "_id"> {
  _id?: string;
  mediaType: "image" | "video";
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_ENDPOINT = `${API_BASE}/testimonials`;

// =========================================================================
//                                  FORM COMPONENT
// =========================================================================

interface TestimonialFormProps {
  initialData?: TestimonialData | null;
  onSuccess: () => void;
  isAdmin: boolean;
  getTokenConfig: (config?: AxiosRequestConfig) => AxiosRequestConfig;
}

// 1. New function to handle the secure file upload

const TestimonialAdminForm: React.FC<TestimonialFormProps> = ({
  initialData,
  onSuccess,
  isAdmin,
  getTokenConfig,
}) => {
  const initialFormState: TestimonialFormData = {
    text: "",
    image: "",
    videoLink: "",
    customerName: "",
    customerPost: "",
    isActive: true,
    mediaType: "image",
  };

  const [formData, setFormData] = useState<TestimonialFormData>(() => {
    if (initialData) {
      const type = initialData.videoLink ? "video" : "image";
      return {
        ...initialFormState,
        ...initialData,
        image: initialData.image || "",
        videoLink: initialData.videoLink || "",
        mediaType: type,
      };
    }
    return initialFormState;
  });

  // 2. New states for file upload management
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [_, setUseUrlInput] = useState(true); // Toggle between URL input and File input

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const isEditing = !!initialData?._id;

  // Reset file/URL states when switching media type
  useEffect(() => {
    // If we switch to video, ensure image states are clear
    if (formData.mediaType === "video") {
      setImageFile(null);
      setUseUrlInput(true); // Default back to URL mode for image type next time
    }
  }, [formData.mediaType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setMessage(null);
  };

  const handleMediaTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      mediaType: e.target.value as "image" | "video",
      image: e.target.value === "video" ? "" : prev.image,
      videoLink: e.target.value === "image" ? "" : prev.videoLink,
    }));
    setImageFile(null); // Clear file when switching to video
    setMessage(null);
  };

  // 3. New handler for file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    setLoading(true);
    setMessage(null);

    const form = new FormData();
    form.append("text", formData.text);
    form.append("customerName", formData.customerName);
    form.append("customerPost", formData.customerPost);
    form.append("isActive", String(formData.isActive));
    form.append(
      "videoLink",
      formData.mediaType === "video" ? formData.videoLink || "" : ""
    );

    if (formData.mediaType === "image" && imageFile) {
      form.append("image", imageFile); // ✅ Match backend FileInterceptor('image')
    }

    const method = isEditing ? "patch" : "post";
    const url = isEditing
      ? `${API_ENDPOINT}/${initialData!._id}`
      : API_ENDPOINT;

    try {
      await axios({
        method,
        url,
        data: form,
        headers: {
          ...getTokenConfig().headers,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage({
        type: "success",
        text: isEditing
          ? "Testimonial updated successfully!"
          : "Testimonial created successfully!",
      });
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to save testimonial" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white shadow-xl rounded-lg border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
        {isEditing ? "Edit Testimonial" : "Create New Testimonial"}
      </h3>

      {message && (
        <div
          className={`p-3 mb-4 rounded-md text-sm font-medium ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Info (Unchanged) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="customerName" className="label block">
              Customer Name *
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="input block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="customerPost" className="label block">
              Customer Post/Role *
            </label>
            <input
              type="text"
              id="customerPost"
              name="customerPost"
              value={formData.customerPost}
              onChange={handleChange}
              required
              className="input block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        {/* Media Type Selection (Radio Buttons - Unchanged) */}
        <div>
          <span className="label block mb-2">Media Type:</span>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="mediaType"
                value="image"
                checked={formData.mediaType === "image"}
                onChange={handleMediaTypeChange}
                className="h-4 w-4 text-indigo-600 border-gray-300"
              />
              <span>Image</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="mediaType"
                value="video"
                checked={formData.mediaType === "video"}
                onChange={handleMediaTypeChange}
                className="h-4 w-4 text-indigo-600 border-gray-300"
              />
              <span>Video Link (YouTube/Short)</span>
            </label>
          </div>
        </div>

        {/* Media Link Input (Conditional & Updated) */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {formData.mediaType === "image" && (
            <div>
              <label htmlFor="imageFile" className="label block mb-2">
                Upload Image *
              </label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/*"
                onChange={handleFileChange}
                required={!isEditing} // only required for new ones
                className="input block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {imageFile && (
                <p className="text-sm text-green-600 mt-2">
                  Selected: <strong>{imageFile.name}</strong> (
                  {Math.round(imageFile.size / 1024)} KB)
                </p>
              )}
            </div>
          )}

          {formData.mediaType === "video" && (
            <div>
              <label htmlFor="videoLink" className="label block">
                Video Link (YouTube/Short) *
              </label>
              <input
                type="text"
                id="videoLink"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleChange}
                required
                className="input block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="e.g., https://youtu.be/dQw4w9WgXcQ"
              />
            </div>
          )}
        </motion.div>

        {/* Testimonial Text & Active Status (Unchanged) */}
        <div>
          <label htmlFor="text" className="label block">
            Testimonial Text *
          </label>
          <textarea
            id="text"
            name="text"
            rows={4}
            value={formData.text}
            onChange={handleChange}
            required
            className="input block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            id="isActive"
            name="isActive"
            type="checkbox"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="isActive" className="label inline-block">
            Is Active (Show on public site)
          </label>
        </div>

        {/* Submit Button (Unchanged) */}
        <button
          type="submit"
          disabled={loading || !isAdmin}
          className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150"
        >
          {loading
            ? "Saving..."
            : isEditing
            ? "Update Testimonial"
            : "Create Testimonial"}
        </button>
      </form>
    </motion.div>
  );
};

// =========================================================================
//                                DASHBOARD COMPONENT (Unchanged)
// =========================================================================

export default function TestimonialAdminDashboard() {
  // 🔑 USE: Get auth state and secure methods directly from your context
  const { hasRole, getTokenConfig, isAuthenticated, user } = useAuth();
  const isAdmin = hasRole("admin");

  const authLoading = isAuthenticated && !user;

  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<TestimonialData | null>(null);
  const [isLoadingList, setIsLoadingList] = useState(true);

  const fetchAllTestimonials = async () => {
    if (!isAdmin) {
      setIsLoadingList(false);
      return;
    }
    setIsLoadingList(true);
    try {
      // 🔑 SECURE: Use getTokenConfig for the fetch
      const response = await axios.get(API_ENDPOINT, getTokenConfig());
      setTestimonials(response.data);
    } catch (error) {
      console.error("Failed to fetch admin testimonials", error);
    } finally {
      setIsLoadingList(false);
    }
  };
  useEffect(() => {
    // Only fetch data if the user is confirmed to be an admin
    if (isAdmin) {
      fetchAllTestimonials();
    }
  }, [isAdmin, getTokenConfig]); // Depend on isAdmin to trigger the fetch

  const handleEdit = (testimonial: TestimonialData) => {
    setSelectedTestimonial(testimonial);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (
      !isAdmin ||
      !window.confirm("Are you sure you want to delete this testimonial?")
    )
      return;
    try {
      // 🔑 SECURE: Use getTokenConfig for delete
      await axios.delete(`${API_ENDPOINT}/${id}`, getTokenConfig());
      fetchAllTestimonials();
    } catch (error) {
      console.error("Failed to delete testimonial", error);
      alert("Failed to delete testimonial.");
    }
  };

  const handleToggleActive = async (id: string) => {
    if (!isAdmin) return;
    try {
      // 🔑 SECURE: Use getTokenConfig for toggle-active (Patch method with no data)
      await axios.patch(
        `${API_ENDPOINT}/${id}/toggle-active`,
        {},
        getTokenConfig()
      );
      fetchAllTestimonials();
    } catch (error) {
      console.error("Failed to toggle active status", error);
      alert("Failed to change active status.");
    }
  };

  // --- Render Logic ---

  if (authLoading || !isAuthenticated) {
    return (
      <div className="p-8 text-center text-lg">
        {authLoading
          ? "Authenticating user..."
          : "Please log in to view this dashboard."}
      </div>
    );
  }

  // Check for admin role
  if (!isAdmin) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-red-100 border border-red-400 text-red-700 rounded-lg text-center mt-10">
        <h2 className="text-2xl font-bold mb-2">Access Denied 🔒</h2>
        <p>You must be an administrator to access the Testimonial Dashboard.</p>
      </div>
    );
  }

  // Admin view
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Testimonial Management Dashboard
      </h1>

      {/* FORM AREA */}
      <TestimonialAdminForm
        initialData={selectedTestimonial}
        onSuccess={() => {
          setSelectedTestimonial(null);
          fetchAllTestimonials();
        }}
        isAdmin={isAdmin}
        getTokenConfig={getTokenConfig}
      />

      <hr />

      {/* LIST AREA */}
      <h2 className="text-2xl font-semibold text-gray-800">
        Existing Testimonials ({testimonials.length})
      </h2>
      <button
        onClick={() => setSelectedTestimonial(null)}
        className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        + Create New Testimonial
      </button>

      {isLoadingList ? (
        <p className="text-gray-600">Loading testimonials list...</p>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="p-4 border rounded-lg flex justify-between items-center bg-gray-50 transition duration-200 hover:shadow-lg"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-lg truncate">
                  {t.customerName}
                </p>
                <p className="text-sm text-gray-500 mb-1">{t.customerPost}</p>
                <div
                  className={`text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center ${
                    t.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {t.isActive ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <XCircle className="w-3 h-3 mr-1" />
                  )}
                  {t.isActive ? "ACTIVE" : "DRAFT"}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleActive(t._id)}
                  className="p-2 border rounded-md hover:bg-gray-100"
                  title={t.isActive ? "Deactivate" : "Activate"}
                >
                  {t.isActive ? (
                    <XCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(t)}
                  className="p-2 border rounded-md hover:bg-gray-100"
                  title="Edit"
                >
                  <Edit className="w-5 h-5 text-blue-500" />
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="p-2 border rounded-md hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
