"use client";

import ProductManagement from "@/components/admin/product-management";
import { useState } from "react";
import {
  LogOut,
  PackageIcon,
  UsersIcon,
  Menu,
  X,
  Loader,
  House,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import TestimonialAdminDashboard from "@/components/admin/testimonial-mangement";
import Image from "next/image";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 300);
  };

  if (!user?.role.includes("admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You don&apos;t have permission to access this page.
          </p>
          <Link href="/auth/login">
            <button className="mt-10 bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors">
              Go back to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            {/* Menu Toggle Button for Mobile */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="bg-white">
                <div className="text-2xl font-heading font-bold gradient-text w-[4rem]">
                  <Image
                    src="/Logo/logo.png"
                    alt="Amar Sanjeevani Logo"
                    width={90}
                    height={90}
                    className="w-full"
                  />
                </div>
              </Link>
              <h1 className="text-lg sm:text-xl font-bold text-blue-600 hidden sm:block">
                Admin Dashboard
              </h1>
            </div>
          </div>

          {/* User Info */}
          <span className="text-xs sm:text-sm text-gray-600">
            Welcome,{" "}
            <span className="font-semibold hidden sm:inline">{user?.name}</span>
            <span className="sm:hidden">{user?.name?.split(" ")[0]}</span>
          </span>
        </div>
      </nav>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex w-64 bg-white border-r fixed top-16 left-0 h-[calc(100vh-4rem)] flex-col justify-between z-40 shadow-md">
        <nav className="p-4 mt-10">
          <div className="space-y-2">
            {/* Product Management */}
            <button
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "products"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleTabChange("products")}
            >
              {isLoading && activeTab === "products" ? (
                <Loader className="w-5 h-5 flex-shrink-0 animate-spin" />
              ) : (
                <PackageIcon className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="ml-3 font-medium">Products</span>
            </button>

            {/* Customers */}
            <button
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "customers"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleTabChange("customers")}
            >
              {isLoading && activeTab === "customers" ? (
                <Loader className="w-5 h-5 flex-shrink-0 animate-spin" />
              ) : (
                <UsersIcon className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="ml-3 font-medium">Customers</span>
            </button>

            {/* Testimonials */}
            <button
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "Testimonials"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleTabChange("Testimonials")}
            >
              {isLoading && activeTab === "Testimonials" ? (
                <Loader className="w-5 h-5 flex-shrink-0 animate-spin" />
              ) : (
                <PackageIcon className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="ml-3 font-medium">Testimonials</span>
            </button>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4">
          {/* Website */}
          <Link
            href="/"
            className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors  bg-teal-600 text-teal-100 mb-4`}
          >
            {isLoading && activeTab === "Website Home" ? (
              <Loader className="w-5 h-5 flex-shrink-0 animate-spin" />
            ) : (
              <House className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="ml-3 font-medium">Website Home</span>
          </Link>
          <button
            className="w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors bg-red-100 hover:bg-red-200 text-red-700 font-medium shadow-sm"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r z-40 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-4">
          <div className="space-y-2">
            {/* Product Management */}
            <button
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "products"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                handleTabChange("products");
                setSidebarOpen(false);
              }}
            >
              {isLoading && activeTab === "products" ? (
                <Loader className="w-5 h-5 flex-shrink-0 animate-spin" />
              ) : (
                <PackageIcon className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="ml-3 font-medium">Products</span>
            </button>

            {/* Customers */}
            <button
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "customers"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                handleTabChange("customers");
                setSidebarOpen(false);
              }}
            >
              {isLoading && activeTab === "customers" ? (
                <Loader className="w-5 h-5 flex-shrink-0 animate-spin" />
              ) : (
                <UsersIcon className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="ml-3 font-medium">Customers</span>
            </button>

            {/* Testimonials */}
            <button
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "Testimonials"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                handleTabChange("Testimonials");
                setSidebarOpen(false);
              }}
            >
              {isLoading && activeTab === "Testimonials" ? (
                <Loader className="w-5 h-5 flex-shrink-0 animate-spin" />
              ) : (
                <PackageIcon className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="ml-3 font-medium">Testimonials</span>
            </button>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4">
          {/* Website */}
          <Link
            href="/"
            className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors  bg-teal-600 text-teal-100 mb-4`}
          >
            {isLoading && activeTab === "Website Home" ? (
              <Loader className="w-5 h-5 flex-shrink-0 animate-spin" />
            ) : (
              <House className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="ml-3 font-medium">Website Home</span>
          </Link>
          <button
            className="w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors bg-red-100 hover:bg-red-200 text-red-700 font-medium shadow-sm"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-20 sm:pt-24 p-4 sm:p-8">
        {/* Content Header */}
        <div className="mb-6">
          {activeTab === "products"}
          {activeTab === "customers" && (
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Customers
            </h2>
          )}
          {activeTab === "Testimonials" && (
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Testimonials Management
            </h2>
          )}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 sm:py-24">
              <div className="text-center">
                <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Loading...</p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === "products" && (
                <div className="p-4 sm:p-6">
                  <ProductManagement />
                </div>
              )}

              {activeTab === "customers" && (
                <div className="p-4 sm:p-6">Comming Soon</div>
              )}

              {activeTab === "Testimonials" && (
                <div className="p-4 sm:p-6">
                  <TestimonialAdminDashboard />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
