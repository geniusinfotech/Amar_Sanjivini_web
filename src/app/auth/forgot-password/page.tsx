"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, RotateCw, AlertCircle, CheckCircle } from "lucide-react";
import axios from "axios";
import Link from "next/link";

// --- CONFIGURATION ---
// Ensure this base URL is available in the new page context
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE}`;

// --- Forgot Password Component (Extracted) ---
const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);
    try {
      // NOTE: API is designed to always return a success message for security,
      // regardless of whether the email exists.
      await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });

      setMessage({
        text: "If the email exists, a password reset link has been sent to your inbox. Check your email (and spam folder).",
        type: "success",
      });
      setEmail("");
    } catch (err) {
      // Show success message even on client-side API error for security
      setMessage({
        text: "If the email exists, a password reset link has been sent to your inbox. Check your email (and spam folder).",
        type: "success",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-white dark:bg-gray-800 p-8 shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700"
    >
      <div className="text-center mb-6">
        <Mail className="w-10 h-10 mx-auto text-teal-600 mb-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Forgot Password?
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Enter your email to receive a password reset link.
        </p>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className={`p-3 mb-4 rounded-lg flex items-start text-sm ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          )}
          <span className="flex-grow">{message.text}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white placeholder-gray-400"
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {isSubmitting ? (
            <RotateCw className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Mail className="w-5 h-5 mr-2" />
          )}
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </motion.button>
      </form>

      <div className="mt-6 text-center text-sm">
        <Link
          href="/auth/login"
          className="text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 font-medium transition-colors"
        >
          Remember your password? Go back to Log In
        </Link>
      </div>
    </motion.div>
  );
};

// --- Page Wrapper Component ---
const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;
