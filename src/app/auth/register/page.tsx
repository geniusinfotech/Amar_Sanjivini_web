"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { User } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface Errors {
  username?: string;
  email?: string;
  password?: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
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

    if (!formData.username) {
      newErrors.username = "username is required";
    }

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
      const registerRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/register`,
        formData
      );

      console.log(registerRes);
      // Handle successful registration (e.g., redirect to login or auto login)
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-blue-50">
      <div className="max-w-md w-full">
        <div className="bg-blue-700 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-blue-900" />
            </div>
            <h1 className="text-2xl font-semibold text-blue-50">
              Create an Account
            </h1>
            <p className="text-blue-50 mt-2">
              Sign up to start your exam preparation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" method="post">
            <div>
              <label className="block text-sm font-medium text-blue-50 mb-2">
                Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full pl-4 py-3 border rounded-lg transition-all bg-white outline-none ${
                  errors.username
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-50 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-4 py-3 border rounded-lg transition-all bg-white outline-none ${
                  errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-50 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-4 py-3 border rounded-lg transition-all bg-white outline-none ${
                  errors.password
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-[#005a34] py-3 rounded-lg hover:bg-green-100 hover:font-bold transition-all font-medium disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#ffe7d6]">
              Already have an account?{" "}
              <Link href="/auth/login">
                <button className="text-[#ffe694] hover:text-[#f9f871] font-medium transition-colors">
                  Log in here
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
