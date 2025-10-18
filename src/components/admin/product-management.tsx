"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Eye, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "@/components/admin/product-form";
import { useAnimation } from "@/providers/animation-provider";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description?: string;
  categoryName: string;
  categoryId?: string;
  price: number;
  isNewProduct?: boolean;
  special?: string;
  Specifications?: string;
  Uses?: string[];
  Benefits?: string[];
  quantity?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProductManagement(): React.JSX.Element {
  const { access_token } = useAuth();
  const { toast } = useToast();
  const { enableAnimations } = useAnimation();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  /** Fetch Products */
  const fetchProducts = useCallback(async () => {
    if (!access_token) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/products/simple`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      const payload = res.data?.products ?? res.data?.data ?? res.data ?? [];
      const list: Product[] = Array.isArray(payload)
        ? payload.map((p) => normalizeProduct(p))
        : [];

      // Sort newest first
      list.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      setProducts(list);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast({
        title: "Fetch Error",
        description: "Unable to load products. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [access_token, toast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /** Derived filtered + sorted products */
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) =>
        [p.name, p.categoryName, p.description]
          .filter(Boolean)
          .some((v) => v!.toLowerCase().includes(q))
      );
    }

    if (categoryFilter) {
      list = list.filter((p) => p.categoryName === categoryFilter);
    }

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "newest")
      list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return list;
  }, [products, searchQuery, categoryFilter, sortBy]);

  /** CRUD Handlers */
  const handleAddProduct = async (productData: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/products`,
        productData,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      toast({
        title: "Product Added",
        description: `${
          res.data.productName || "A new product"
        } has been added.`,
      });
      setIsAddDialogOpen(false);
      await fetchProducts();
    } catch (error) {
      console.error("Add Product Error:", error);
      toast({
        title: "Action Failed",
        description: "Could not add the product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = async (productData: any) => {
    if (!selectedProduct) return;
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE}/products/${selectedProduct.id}`,
        productData,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      toast({
        title: "Product Updated",
        description: `${
          res.data.productName || selectedProduct.name
        } has been updated.`,
      });
      setIsEditDialogOpen(false);
      setSelectedProduct(null);
      await fetchProducts();
    } catch (error) {
      console.error("Edit Product Error:", error);
      toast({
        title: "Action Failed",
        description: "Could not update product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE}/products/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      toast({
        title: "Product Deleted",
        description: "Product has been removed.",
      });
      await fetchProducts();
    } catch (error) {
      console.error("Delete Product Error:", error);
      toast({
        title: "Action Failed",
        description: "Could not delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  /** UI Helpers */
  const openEditFor = (p: Product) => {
    setSelectedProduct(p);
    setIsEditDialogOpen(true);
  };

  /** Main Render */
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Product Management
          </h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-green-900">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSubmit={handleAddProduct} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="flex max-sm:flex-col items-center justify-center gap-4">
        <SummaryCard label="Total Products" value={products.length} />
        <SummaryCard
          label="Total Categories"
          value={new Set(products.map((p) => p.categoryName)).size}
        />
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6 flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            className="border border-gray-200 p-2 rounded-lg min-w-40"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {[...new Set(products.map((p) => p.categoryName))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Product Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <SkeletonLoader count={5} />
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No products found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title & Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredProducts.map((p) => (
                  <motion.tr
                    key={p.id}
                    initial={enableAnimations ? { opacity: 0, y: 20 } : {}}
                    animate={{ opacity: 1, y: 0 }}
                    className="group"
                  >
                    <TableCell>
                      {p.image ? (
                        <div className="w-20 h-28 rounded overflow-hidden border transition-transform hover:scale-105">
                          <Image
                            src={p.image}
                            alt={p.name}
                            height={300}
                            width={200}
                            unoptimized
                            className="object-cover w-full h-full"
                            quality={100} // keep HD quality
                            priority // preloads for visible images
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                          <Package className="w-5 h-5" />
                        </div>
                      )}
                    </TableCell>

                    <TableCell>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {p.description || "-"}
                      </p>
                    </TableCell>

                    <TableCell>{p.categoryName}</TableCell>
                    <TableCell>₹ {p.price.toLocaleString()}</TableCell>
                    <TableCell>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(p.updatedAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center space-x-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => console.log("View", p.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditFor(p)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(p.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedProduct(null);
          setIsEditDialogOpen(open);
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-green-900">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <ProductForm
              product={{
                id: selectedProduct.id,
                name: selectedProduct.name,
                description: selectedProduct.description,
                price: selectedProduct.price,
                categoryName: selectedProduct.categoryName,
                categoryId: selectedProduct.categoryId,
                image: selectedProduct.image,
                isNewProduct: selectedProduct.isNewProduct,
                special: selectedProduct.special,
                Specifications: selectedProduct.Specifications,
                Uses: selectedProduct.Uses,
                Benefits: selectedProduct.Benefits,
                quantity: selectedProduct.quantity,
              }}
              onSubmit={handleEditProduct}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/** Small helper components */
const SummaryCard = ({ label, value }: { label: string; value: number }) => (
  <div className="px-5 py-3 bg-teal-600 text-white rounded-xl text-center">
    <h2 className="text-xl font-semibold">{label}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const SkeletonLoader = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4 animate-pulse">
        <div className="w-16 h-16 bg-muted rounded" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-1/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

/** Normalize product data */
function normalizeProduct(raw: any): Product {
  const imageFile = raw.image ?? raw.images?.[0] ?? "";
  const imageUrl = imageFile?.startsWith("https")
    ? imageFile
    : `${process.env.NEXT_PUBLIC_API_BASE}/uploads/${imageFile}`;

  return {
    id: String(raw.id ?? raw._id ?? Math.random()),
    name: raw.name ?? "Unnamed Product",
    description: raw.description ?? "",
    categoryName: raw.categoryName ?? raw.category?.name ?? "Uncategorized",
    categoryId: raw.categoryId ?? raw.category?._id ?? "",
    price: Number(raw.price ?? 0),
    image: imageUrl,
    createdAt: raw.createdAt ?? new Date().toISOString(),
    updatedAt: raw.updatedAt ?? new Date().toISOString(),
  };
}
