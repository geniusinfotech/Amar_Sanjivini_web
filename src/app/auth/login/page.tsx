"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const loginRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/login`,
        formData
      );

      const { userId, username, email, roles, access_token } = loginRes.data;

      login(userId, username, email, roles, access_token);
      console.log("API Response:", loginRes.data);

      // Redirect based on role
      if (roles && Array.isArray(roles) && roles.includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setErrors({ email: "Invalid email or password" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-blue-50">
      <div className="max-w-md w-full">
        <div className=" bg-blue-700 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-blue-900" />
            </div>
            <h1 className="text-2xl font-semibold text-blue-50">
              Welcome Back
            </h1>
            <p className="text-blue-50 mt-2">
              Sign in to continue your exam preparation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-blue-50 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-950" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all bg-white outline-none ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-blue-50 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-950" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-white outline-none transition-all ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-blue-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-blue-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-blue-50">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 border-white rounded-xl"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" scroll>
                <button type="button" className="text-sm text-blue-50">
                  Forgot password?
                </button>
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-[#005a34] py-3 rounded-lg hover:bg-green-100 hover:font-bold transition-all font-medium disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Google Login Button */}
          <div className="mt-5 flex items-center justify-center"></div>

          <div className="mt-6 text-center">
            <p className="text-blue-50">
              Don&apos;t have an account?{" "}
              <Link scroll href="/auth/register">
                <button className="text-teal-100 hover:text-teal-400 font-medium transition-colors">
                  Sign up here
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
