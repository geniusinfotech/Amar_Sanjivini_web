"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "@/components/card/ProductCard";
import { Filter, Search } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  categoryId: string;
  image: string;
  isNewProduct: boolean;
  special?: string;
  Specifications?: string;
  Uses?: string[];
  Benefits?: string[];
  quantity?: string;
}

export default function ProductsPage() {
  // ---- States ----
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE;

  // ---- Fetch Categories ----
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/products/simple`);
      const data = response.data;

      const uniqueCats = Array.from(
        new Set(data.map((p: Product) => p.categoryName))
      ) as string[];

      setCategories(["All", ...uniqueCats]);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // ---- Fetch Products ----
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = `${apiBaseUrl}/products/simple`;

      // If a specific category is selected, use category endpoint
      if (selectedCategory !== "All") {
        url = `${apiBaseUrl}/products/category/name/${encodeURIComponent(
          selectedCategory
        )}`;
      }

      const response = await axios.get(url);
      let fetchedProducts = response.data;

      // Apply search filter
      if (search.trim()) {
        const searchLower = search.toLowerCase().trim();
        fetchedProducts = fetchedProducts.filter(
          (p: Product) =>
            p.name.toLowerCase().includes(searchLower) ||
            p.description?.toLowerCase().includes(searchLower) ||
            p.categoryName?.toLowerCase().includes(searchLower)
        );
      }

      // Apply price filter
      if (minPrice || maxPrice) {
        fetchedProducts = fetchedProducts.filter((p: Product) => {
          const price = p.price;
          const min = minPrice ? parseFloat(minPrice) : 0;
          const max = maxPrice ? parseFloat(maxPrice) : Infinity;
          return price >= min && price <= max;
        });
      }

      setProducts(fetchedProducts);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---- Effects ----
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  // ---- Handlers ----
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const handlePriceFilter = () => {
    fetchProducts();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsFilterOpen(false);
  };

  // ---- Skeleton ----
  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-sm p-4 space-y-3 animate-pulse"
        >
          <div className="w-full h-64 rounded-lg bg-gray-200"></div>
          <div className="w-3/4 h-4 rounded bg-gray-200"></div>
          <div className="w-1/2 h-4 rounded bg-gray-200"></div>
          <div className="w-full h-10 rounded bg-gray-200 mt-4"></div>
        </div>
      ))}
    </div>
  );

  // ---- UI ----
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-lg text-green-100 max-w-2xl">
            Browse our complete range of premium agricultural products —
            fertilizers, pesticides, herbicides, and more.
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
            <span className="ml-2 text-gray-500 text-lg font-normal">
              ({products.length}{" "}
              {products.length === 1 ? "product" : "products"})
            </span>
          </h2>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Filters */}
        <div
          className={`${
            isFilterOpen ? "block" : "hidden"
          } md:block mb-6 space-y-4`}
        >
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products... "
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-700"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-green-700 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Price Range Filter */}
          <div className="flex flex-wrap gap-3 items-center">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
            />
            <button
              onClick={handlePriceFilter}
              className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
            >
              Apply
            </button>
            {(minPrice || maxPrice) && (
              <button
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("");
                  fetchProducts();
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <SkeletonGrid />
        ) : error ? (
          <div className="text-center py-16">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-800 font-semibold mb-2">
                Error Loading Products
              </p>
              <p className="text-red-600 text-sm mb-4">{error}</p>
              <button
                onClick={fetchProducts}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <p className="text-gray-600 text-lg font-medium">
              No products found
            </p>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
