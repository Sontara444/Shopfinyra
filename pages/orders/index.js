"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FiPackage, FiCalendar, FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import { authAPI, ordersAPI } from "../../lib/api/client"; // adjust paths if needed

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = authAPI.getUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await ordersAPI.getUserOrders(); // your API call
        setOrders(data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-lg">
        Loading your orders...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f3] to-[#f2eeeb] py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-10 border border-gray-100 transition-all duration-500 hover:shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#362222] rounded-full text-white">
              <FiShoppingBag className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-light text-gray-900">
              My <span className="font-semibold">Orders</span>
            </h1>
          </div>

          <button
            onClick={() => router.push("/profile")}
            className="flex items-center gap-2 text-[#362222] hover:underline hover:scale-105 transition-all"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Profile
          </button>
        </div>

        {/* No Orders */}
        {orders.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <FiPackage className="mx-auto w-12 h-12 mb-4 text-gray-400" />
            <p className="text-lg">You haven't placed any orders yet.</p>
            <button
              onClick={() => router.push("/products")}
              className="mt-6 px-6 py-3 bg-[#362222] text-white rounded-lg hover:bg-[#5A2300] transition-all duration-300 hover:scale-105"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-2xl p-6 bg-[#faf8f7] hover:bg-white transition-all duration-300 hover:shadow-md"
            >
              {/* Order Header */}
              <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium text-gray-900">#{order._id}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FiCalendar className="w-4 h-4" />
                  <p className="text-sm">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <p
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </p>
              </div>

              {/* Products in Order */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white rounded-xl p-3 border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <div>
                        <p className="text-gray-900 font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex justify-between items-center mt-5 pt-4 border-t">
                <p className="text-gray-600 text-sm">
                  {order.items.length} item{order.items.length > 1 && "s"} total
                </p>
                <p className="text-lg font-semibold text-[#362222]">
                  ₹{order.total.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
