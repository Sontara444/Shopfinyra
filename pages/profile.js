"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "../lib/api/client";

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
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-8 lg:px-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-light text-gray-900 mb-6 border-b pb-4">
          My Profile
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-medium text-gray-900">{user.name || "—"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium text-gray-900">{user.email || "—"}</p>
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

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => router.push("/orders")}
            className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            View Orders
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2 border border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
