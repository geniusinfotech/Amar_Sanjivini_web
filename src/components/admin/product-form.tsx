"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

export interface ProductFormProps {
  product?: Partial<ProductFormData> & { id?: string };
  isAdmin?: boolean;
  onSubmit?: (data: FormData) => Promise<void>;
  onCancel?: () => void;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number | "";
  categoryName: string;
  categoryId: string;
  image: File | string | null;
  isNewProduct?: boolean;
  special?: string;
  Specifications?: string;
  Uses?: string[];
  Benefits?: string[];
  quantity?: string;
}

export default function ProductForm({
  product,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price ?? "",
    categoryName: product?.categoryName || "",
    categoryId: product?.categoryId || "",
    image: product?.image || null,
    isNewProduct: product?.isNewProduct || false,
    special: product?.special || "",
    Specifications: product?.Specifications || "",
    Uses: product?.Uses || [""],
    Benefits: product?.Benefits || [""],
    quantity: product?.quantity || "",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    typeof product?.image === "string" ? product.image : null
  );
  const [loading, setLoading] = useState(false);

  // Image preview effect
  useEffect(() => {
    if (formData.image instanceof File) {
      const url = URL.createObjectURL(formData.image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    if (typeof formData.image === "string" && formData.image) {
      setPreviewUrl(formData.image);
    }
  }, [formData.image]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange("isNewProduct", e.target.checked);
  };

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  // Dynamic list handlers
  const handleListItemChange = (
    field: "Uses" | "Benefits",
    index: number,
    value: string
  ) => {
    const updatedList = [...(formData[field] || [])];
    updatedList[index] = value;
    handleInputChange(field, updatedList);
  };

  const addListItem = (field: "Uses" | "Benefits") => {
    const currentList = formData[field] || [];
    handleInputChange(field, [...currentList, ""]);
  };

  const removeListItem = (field: "Uses" | "Benefits", index: number) => {
    const updatedList = (formData[field] || []).filter((_, i) => i !== index);
    handleInputChange(field, updatedList.length > 0 ? updatedList : [""]);
  };

  // form validation
  const validateForm = () => {
    const requiredFields: (keyof ProductFormData)[] = [
      "name",
      "description",
      "price",
      "categoryName",
      "categoryId",
      "image",
    ];

    for (const field of requiredFields) {
      const value = formData[field];
      if (value === "" || value === null || value === undefined) {
        alert(`Field "${field}" is required`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const data = new FormData();

      // 1. Append single fields
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", String(formData.price));
      data.append("categoryName", formData.categoryName);
      data.append("categoryId", formData.categoryId);
      data.append("isNewProduct", formData.isNewProduct ? "true" : "false");

      data.append("special", formData.special || "");
      data.append("Specifications", formData.Specifications || "");
      data.append("quantity", formData.quantity || "");

      // 2. Handle Image Upload
      if (formData.image instanceof File) {
        data.append("image", formData.image);
      } else if (typeof formData.image === "string") {
        // If image is a string, it's an existing URL/path, so we send it.
        data.append("image", formData.image);
      } else {
        // This case should be caught by validateForm, but good to have a fallback
        alert("Please select an image");
        setLoading(false);
        return;
      }

      // 3. Handle Dynamic Lists (Uses & Benefits)
      // Filter out empty strings before sending.
      const filteredUses = (formData.Uses || []).filter(
        (use) => use.trim() !== ""
      );
      const filteredBenefits = (formData.Benefits || []).filter(
        (benefit) => benefit.trim() !== ""
      );

      // Only append to FormData if the array is NOT empty after filtering.
      // This prevents sending an empty string or 'falsey' value if the user left the fields blank.
      if (filteredUses.length > 0) {
        // Append each item individually (standard FormData array practice)
        filteredUses.forEach((use) => data.append("Uses[]", use));
      }
      if (filteredBenefits.length > 0) {
        // Append each item individually (standard FormData array practice)
        filteredBenefits.forEach((benefit) =>
          data.append("Benefits[]", benefit)
        );
      }

      // NOTE: Using "Uses[]" and "Benefits[]" is a common convention to signal an array
      // to backend frameworks like Express/Node or PHP. Adjust if your server requires
      // just "Uses" and "Benefits" keys for arrays.

      if (onSubmit) await onSubmit(data);
      alert("Product saved successfully");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-white"
      encType="multipart/form-data"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="categoryName">Category Name *</Label>
                <Input
                  id="categoryName"
                  value={formData.categoryName}
                  onChange={(e) =>
                    handleInputChange("categoryName", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="categoryId">Category ID *</Label>
                <Input
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={(e) =>
                    handleInputChange("categoryId", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                placeholder="e.g., 1 Kg, 500gm (enter only number with unit)"
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="special">Special</Label>
              <Textarea
                id="special"
                value={formData.special}
                onChange={(e) => handleInputChange("special", e.target.value)}
                rows={3}
                placeholder="Special features or highlights"
              />
            </div>

            <div>
              <Label htmlFor="Specifications">Specifications</Label>
              <Textarea
                id="Specifications"
                value={formData.Specifications}
                onChange={(e) =>
                  handleInputChange("Specifications", e.target.value)
                }
                rows={3}
                placeholder="Product specifications"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Uses and Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Uses</CardTitle>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => addListItem("Uses")}
              className="flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Use
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {(formData.Uses || [""]).map((use, index) => (
              <div key={index} className="flex gap-2 items-start">
                <Textarea
                  value={use}
                  onChange={(e) =>
                    handleListItemChange("Uses", index, e.target.value)
                  }
                  placeholder="Enter a use case"
                  rows={2}
                  className="flex-1"
                />
                {(formData.Uses || []).length > 1 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => removeListItem("Uses", index)}
                    className="mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Benefits</CardTitle>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => addListItem("Benefits")}
              className="flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Benefit
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {(formData.Benefits || [""]).map((benefit, index) => (
              <div key={index} className="flex gap-2 items-start">
                <Textarea
                  value={benefit}
                  onChange={(e) =>
                    handleListItemChange("Benefits", index, e.target.value)
                  }
                  placeholder="Enter a benefit"
                  rows={2}
                  className="flex-1"
                />
                {(formData.Benefits || []).length > 1 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => removeListItem("Benefits", index)}
                    className="mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Image Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Product Image</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image">Main Image *</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!previewUrl}
              />
            </div>

            {previewUrl && (
              <div className="mt-2 relative w-32 h-32">
                <Image
                  src={previewUrl}
                  alt="Product preview"
                  className="w-32 h-32 object-cover rounded"
                  width={128}
                  height={128}
                  quality={100}
                  priority
                  unoptimized
                />
                <X
                  className="absolute top-0 right-0 w-5 h-5 cursor-pointer bg-white rounded-full p-1"
                  onClick={() => {
                    handleInputChange("image", null);
                    setPreviewUrl(null);
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Product Flags */}
      <Card>
        <CardHeader>
          <CardTitle>Product Flags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isNewProduct"
              checked={formData.isNewProduct ?? true}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <Label htmlFor="isNewProduct" className="cursor-pointer">
              Mark as New Product
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 text-white"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : product?.id
            ? "Update Product"
            : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
