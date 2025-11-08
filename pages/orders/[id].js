"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FiArrowLeft,
  FiCalendar,
  FiMapPin,
  FiPackage,
  FiTruck,
  FiShoppingBag,
} from "react-icons/fi";
import { authAPI, ordersAPI } from "../../lib/api/client"; // adjust if needed

export default function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const currentUser = authAPI.getUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }

    if (id) {
      const fetchOrder = async () => {
        try {
          const data = await ordersAPI.getOrderById(id); // your backend API
          setOrder(data);
        } catch (error) {
          console.error("Error fetching order details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [id, router]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-lg">
        Loading order details...
      </div>
    );

  if (!order)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700 text-center">
        <FiPackage className="w-12 h-12 text-gray-400 mb-3" />
        <p className="text-lg">Order not found.</p>
        <button
          onClick={() => router.push("/orders")}
          className="mt-6 px-6 py-3 bg-[#362222] text-white rounded-lg hover:bg-[#5A2300] transition-all duration-300 hover:scale-105"
        >
          Back to Orders
        </button>
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
              Order <span className="font-semibold">#{order._id}</span>
            </h1>
          </div>

          <button
            onClick={() => router.push("/orders")}
            className="flex items-center gap-2 text-[#362222] hover:underline hover:scale-105 transition-all"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Orders
          </button>
        </div>

        {/* Order Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#faf8f7] rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <FiCalendar className="w-5 h-5 text-[#362222]" />
              <p className="text-gray-700 text-sm">
                Placed on:{" "}
                <span className="font-medium text-gray-900">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <FiTruck className="w-5 h-5 text-[#362222]" />
              <p className="text-gray-700 text-sm">
                Delivery Status:{" "}
                <span
                  className={`font-semibold ${
                    order.status === "Delivered"
                      ? "text-green-700"
                      : order.status === "Processing"
                      ? "text-yellow-700"
                      : "text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FiPackage className="w-5 h-5 text-[#362222]" />
              <p className="text-gray-700 text-sm">
                Total Amount:{" "}
                <span className="font-semibold text-[#362222]">
                  ₹{order.total.toLocaleString("en-IN")}
                </span>
              </p>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-[#faf8f7] rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <FiMapPin className="w-5 h-5 text-[#362222]" />
              <p className="text-gray-700 text-sm font-medium">Delivery Address</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {order.shippingAddress?.name && (
                <span className="font-medium">{order.shippingAddress.name}</span>
              )}
              <br />
              {order.shippingAddress?.street}
              <br />
              {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
              {order.shippingAddress?.zip}
              <br />
              {order.shippingAddress?.country}
            </p>
          </div>
        </div>

        {/* Products List */}
        <div>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Items Ordered</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <p className="text-gray-900 font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-[#362222]">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex justify-end">
          <p className="text-lg font-semibold text-[#362222]">
            Total Paid: ₹{order.total.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
}
