"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useAnimation } from "@/providers/animation-provider";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

interface WishlistItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  image?: string;
  addedDate: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  joinDate: string;
  status: "active" | "inactive";
  addresses: Array<{
    type: "home" | "work" | "other";
    street: string;
    city: string;
    state: string;
    pincode: string;
  }>;
  orders: Array<{
    id: string;
    date: string;
    total: number;
    status: string;
  }>;
}

export function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistError, setWishlistError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { enableAnimations } = useAnimation();
  const { access_token } = useAuth();

  // Fetch all customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter customers when search query or customers list changes
  useEffect(() => {
    filterCustomers();
  }, [customers, searchQuery]);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/users`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setCustomers(response.data.data || []);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || "Failed to load customers"
          : "Failed to load customers"
      );
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const filterCustomers = () => {
    let filtered = customers;

    if (searchQuery) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.phone.includes(searchQuery)
      );
    }

    setFilteredCustomers(filtered);
  };

  const fetchWishlist = async (userId: string) => {
    setWishlistLoading(true);
    setWishlistError(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/users/${userId}/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setWishlist(response.data.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistError(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to load wishlist"
          : "Failed to load wishlist"
      );
      setWishlist([]);
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleOpenCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsCustomerDialogOpen(true);
    fetchWishlist(customer.id);
  };

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 50000) return { tier: "VIP", color: "bg-purple-500" };
    if (totalSpent >= 25000) return { tier: "Gold", color: "bg-yellow-500" };
    if (totalSpent >= 10000) return { tier: "Silver", color: "bg-gray-400" };
    return { tier: "Bronze", color: "bg-orange-500" };
  };

  const CustomerDetailsDialog = ({ customer }: { customer: Customer }) => {
    const tierInfo = getCustomerTier(customer.totalSpent);

    return (
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customer Details - {customer.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Overview */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={customer.avatar} />
                  <AvatarFallback className="text-lg">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold">{customer.name}</h3>
                    <Badge className={`${tierInfo.color} text-white`}>
                      {tierInfo.tier}
                    </Badge>
                    <Badge
                      variant={
                        customer.status === "active" ? "default" : "secondary"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>
                        Joined{" "}
                        {new Date(customer.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>
                        Last order{" "}
                        {new Date(customer.lastOrderDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Orders
                      </p>
                      <p className="text-2xl font-bold">
                        {customer.totalOrders}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Spent
                      </p>
                      <p className="text-2xl font-bold">
                        ₹{customer.totalSpent.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Addresses */}
          <Card>
            <CardHeader>
              <CardTitle>Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customer.addresses.map((address, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <Badge variant="outline" className="capitalize">
                        {address.type}
                      </Badge>
                    </div>
                    <p className="text-sm">
                      {address.street}
                      <br />
                      {address.city}, {address.state}
                      <br />
                      {address.pincode}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Wishlist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>Wishlist ({wishlist.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {wishlistLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader className="w-5 h-5 animate-spin text-muted-foreground mr-2" />
                  <span className="text-muted-foreground">
                    Loading wishlist...
                  </span>
                </div>
              ) : wishlistError ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{wishlistError}</p>
                </div>
              ) : wishlist.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-muted-foreground">No items in wishlist</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {wishlist.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={enableAnimations ? { opacity: 0, y: 10 } : {}}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      {item.image && (
                        <div className="mb-3 bg-gray-100 rounded-md h-32 flex items-center justify-center overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.productName}
                            width={200}
                            height={128}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                      <p className="font-medium text-sm mb-1">
                        {item.productName}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-red-600">
                          ₹{item.price.toLocaleString()}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {new Date(item.addedDate).toLocaleDateString()}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {customer.orders.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No orders found
                </p>
              ) : (
                <div className="space-y-4">
                  {customer.orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ₹{order.total.toLocaleString()}
                        </p>
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "default"
                              : order.status === "processing"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button>View All Orders</Button>
          </div>
        </div>
      </DialogContent>
    );
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader className="w-8 h-8 animate-spin text-muted-foreground mb-2" />
          <p className="text-muted-foreground">Loading customers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="p-6">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
              <Button onClick={fetchCustomers} className="mt-4">
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Customer Management
          </h1>
          <p className="text-muted-foreground">
            Manage customer relationships and data
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Customers
                </p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Customers
                </p>
                <p className="text-2xl font-bold">
                  {customers.filter((c) => c.status === "active").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">✅</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  VIP Customers
                </p>
                <p className="text-2xl font-bold">
                  {customers.filter((c) => c.totalSpent >= 50000).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xl">👑</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg. Order Value
                </p>
                <p className="text-2xl font-bold">
                  ₹
                  {customers.length > 0 &&
                  customers.reduce((acc, c) => acc + c.totalOrders, 0) > 0
                    ? Math.round(
                        customers.reduce((acc, c) => acc + c.totalSpent, 0) /
                          customers.reduce((acc, c) => acc + c.totalOrders, 0)
                      ).toLocaleString()
                    : "0"}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-xl">💰</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No customers found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => {
                  const tierInfo = getCustomerTier(customer.totalSpent);

                  return (
                    <motion.tr
                      key={customer.id}
                      initial={enableAnimations ? { opacity: 0, y: 20 } : {}}
                      animate={{ opacity: 1, y: 0 }}
                      className="group"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={customer.avatar} />
                            <AvatarFallback>
                              {customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {customer.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{customer.email}</p>
                          <p className="text-sm text-muted-foreground">
                            {customer.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {customer.totalOrders}
                      </TableCell>
                      <TableCell className="font-medium">
                        ₹{customer.totalSpent.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${tierInfo.color} text-white`}>
                          {tierInfo.tier}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(customer.lastOrderDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            customer.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog
                          open={
                            isCustomerDialogOpen &&
                            selectedCustomer?.id === customer.id
                          }
                          onOpenChange={setIsCustomerDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleOpenCustomerDetails(customer)
                              }
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          {selectedCustomer && (
                            <CustomerDetailsDialog
                              customer={selectedCustomer}
                            />
                          )}
                        </Dialog>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
