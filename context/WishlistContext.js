"use client";
import { createContext, useContext, useReducer, useEffect } from "react";

const WishlistContext = createContext();

const initialState = { items: [] };

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST": {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) return state;
      return { ...state, items: [...state.items, action.payload] };
    }

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "TOGGLE_WISHLIST": {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    }

    case "LOAD_WISHLIST":
      return { ...state, items: action.payload };

    case "CLEAR_WISHLIST":
      return { ...state, items: [] };

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // ✅ Load wishlist from localStorage
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("god-statues-wishlist");
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        dispatch({ type: "LOAD_WISHLIST", payload: parsed });
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  }, []);

  // ✅ Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("god-statues-wishlist", JSON.stringify(state.items));
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  }, [state.items]);

  // ✅ Normalize every product to always have an `id`
  const normalizeProduct = (product) => ({
    ...product,
    id: product.id || product._id,
  });

  // ✅ Actions
  const addToWishlist = (product) =>
    dispatch({ type: "ADD_TO_WISHLIST", payload: normalizeProduct(product) });

  const removeFromWishlist = (id) =>
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });

  const toggleWishlist = (product) =>
    dispatch({ type: "TOGGLE_WISHLIST", payload: normalizeProduct(product) });

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" });
    localStorage.removeItem("god-statues-wishlist");
  };

  // ✅ Helpers
  const isInWishlist = (id) =>
    state.items.some((item) => item.id === id || item._id === id);

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
};
