"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Key, RotateCw, AlertCircle, CheckCircle } from "lucide-react";
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE}`;

const ResetPasswordPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      setToken(urlToken);
    } else {
      setMessage({
        text: "Password reset token is missing from the URL.",
        type: "error",
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!token) {
      setMessage({ text: "Cannot proceed: Token is missing.", type: "error" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({
        text: "New password and confirmation do not match.",
        type: "error",
      });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({
        text: "New password must be at least 6 characters long.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        token,
        newPassword,
      });

      setMessage({
        text: "Password reset successfully! Redirecting to login...",
        type: "success",
      });

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err) {
      let errorMsg = "An unexpected error occurred.";
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 400) {
          errorMsg =
            "Invalid or expired reset token. Please request a new link.";
        } else {
          errorMsg = err.response.data.message || errorMsg;
        }
      }
      setMessage({ text: errorMsg, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white flex items-center justify-center">
          <Key className="w-6 h-6 mr-2 text-indigo-600" />
          Reset Password
        </h1>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 mb-4 rounded-lg flex items-center text-sm ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            {message.text}
          </motion.div>
        )}

        {!token && message?.type === "error" ? (
          <div className="text-center text-sm mt-4">
            <p>
              If you need help, please try requesting a new password reset link.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/auth/login")}
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Go to Login
            </motion.button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter new password (min 6 characters)"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Confirm new password"
                disabled={isSubmitting}
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting || !token}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <RotateCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Key className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? "Resetting..." : "Set New Password"}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
