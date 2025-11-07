// API Client Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Get token from localStorage if available
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// ✅ Auth API
export const authAPI = {
  signup: async (userData) => {
    const response = await apiRequest("/auth/signup", {
      method: "POST",
      body: userData,
    });

    if (response.data && response.data.token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.dispatchEvent(new Event("storage")); // 🔥 notify Navbar
      }
    }

    return response;
  },

  login: async (credentials) => {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: credentials,
    });

    if (response.data && response.data.token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.dispatchEvent(new Event("storage")); // 🔥 notify Navbar
      }
    }

    return response;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("storage")); // 🔥 notify Navbar
    }
  },

  getCurrentUser: async () => {
    return await apiRequest("/auth/me", {
      method: "GET",
    });
  },

  isAuthenticated: () => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  },

  getToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },

  getUser: () => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user");

    if (!user || user === "undefined" || user === "null") {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  },
};

// ✅ Products API
export const productsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ""}`;
    return await apiRequest(endpoint, {
      method: "GET",
    });
  },

  getById: async (id) => {
    return await apiRequest(`/products/${id}`, {
      method: "GET",
    });
  },

  create: async (productData) => {
    return await apiRequest("/products", {
      method: "POST",
      body: productData,
    });
  },

  update: async (id, productData) => {
    return await apiRequest(`/products/${id}`, {
      method: "PUT",
      body: productData,
    });
  },

  delete: async (id) => {
    return await apiRequest(`/products/${id}`, {
      method: "DELETE",
    });
  },
};

// ✅ Orders API
export const ordersAPI = {
  create: async (orderData) => {
    return await apiRequest("/orders", {
      method: "POST",
      body: orderData,
    });
  },

  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/orders${queryString ? `?${queryString}` : ""}`;
    return await apiRequest(endpoint, {
      method: "GET",
    });
  },

  getById: async (id) => {
    return await apiRequest(`/orders/${id}`, {
      method: "GET",
    });
  },

  markAsPaid: async (id, paymentData) => {
    return await apiRequest(`/orders/${id}/pay`, {
      method: "PUT",
      body: paymentData,
    });
  },
};

export default {
  auth: authAPI,
  products: productsAPI,
  orders: ordersAPI,
};
