"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { Loader2 } from "lucide-react";

interface DecodedToken {
  sub: string; // user ID
  email: string;
  username: string;
  roles: string[];
  iat: number;
  exp: number;
}

const GoogleCallbackPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent multiple executions
    if (hasProcessed.current) {
      console.log("Callback already processed, skipping...");
      return;
    }

    const handleCallback = async () => {
      // Mark as processed immediately
      hasProcessed.current = true;

      try {
        // Extract parameters from URL
        const token = searchParams.get("token");
        const username = searchParams.get("username");
        const email = searchParams.get("email");
        const rolesParam = searchParams.get("roles");

        console.log("🔄 Processing Google OAuth callback...");

        // Validate required parameters
        if (!token || !username || !email || !rolesParam) {
          console.error("❌ Missing parameters:", { token: !!token, username: !!username, email: !!email, roles: !!rolesParam });
          setError("Missing authentication data. Please try again.");
          setTimeout(() => router.push("/auth/login"), 3000);
          return;
        }

        // Parse roles (comes as comma-separated string)
        const roles = rolesParam.split(",");

        // Decode JWT token to extract user ID
        let userId: string;
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          userId = decoded.sub; // 'sub' field contains the user ID
          console.log("🔓 Decoded token:", { userId, email: decoded.email, roles: decoded.roles });
        } catch (decodeError) {
          console.error("⚠️ Failed to decode token:", decodeError);
          // Fallback to email if token decode fails
          userId = email;
        }

        // Log the user in using the AuthContext
        console.log("🔐 Logging in user:", { userId, username, email, roles });
        login(userId, username, email, roles, token);

        console.log("✅ Google OAuth login successful - redirecting...");

        // Use router.replace instead of router.push to prevent back button issues
        // Small delay to ensure localStorage is updated
        setTimeout(() => {
          if (roles.includes("admin")) {
            router.replace("/admin");
          } else {
            router.replace("/");
          }
        }, 300);
      } catch (err) {
        console.error("❌ Google OAuth callback error:", err);
        setError("Authentication failed. Please try again.");
        setTimeout(() => router.push("/auth/login"), 3000);
      }
    };

    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <div className="text-red-600 text-xl font-semibold mb-2">
              Authentication Error
            </div>
            <p className="text-red-500">{error}</p>
            <p className="text-sm text-gray-600 mt-4">
              Redirecting to login page...
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 shadow-xl">
            <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Completing Sign In
            </h2>
            <p className="text-gray-600">
              Please wait while we authenticate your account...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleCallbackPage;
