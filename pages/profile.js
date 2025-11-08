"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "../lib/api/client";
import { FiUser, FiMail, FiCalendar, FiLogOut, FiBox } from "react-icons/fi";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = authAPI.getUser();
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    router.push("/");
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f3] to-[#f2eeeb] py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-10 border border-gray-100 transition-all duration-500 hover:shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 border-b pb-5">
          <div className="w-16 h-16 rounded-full bg-[#362222] flex items-center justify-center text-white text-2xl shadow-md">
            {user.name ? user.name.charAt(0).toUpperCase() : <FiUser />}
          </div>
          <div>
            <h1 className="text-3xl font-light text-gray-900">
              Hello, <span className="font-semibold">{user.name || "User"}</span>
            </h1>
            <p className="text-gray-600 text-sm mt-1">Welcome to your profile dashboard</p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#f8f5f3] rounded-xl text-[#362222]">
              <FiUser className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-lg font-medium text-gray-900">{user.name || "—"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#f8f5f3] rounded-xl text-[#362222]">
              <FiMail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium text-gray-900">{user.email || "—"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#f8f5f3] rounded-xl text-[#362222]">
              <FiCalendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="text-lg font-medium text-gray-900">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap gap-4 justify-between items-center">
          <button
            onClick={() => router.push("/orders")}
            className="flex items-center gap-2 bg-[#362222] text-white px-6 py-3 rounded-lg 
            font-medium text-sm transition-all duration-300 hover:bg-[#5A2300] hover:scale-105"
          >
            <FiBox className="w-5 h-5" />
            View Orders
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-[#362222] text-[#362222] px-6 py-3 rounded-lg 
            font-medium text-sm transition-all duration-300 hover:bg-[#362222] hover:text-white hover:scale-105"
          >
            <FiLogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
