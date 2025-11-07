import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = { items: [] };

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }

    case "REMOVE_FROM_CART":
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "LOAD_CART":
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // ✅ Load cart from localStorage on first render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("god-statues-cart");
      if (savedCart) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("god-statues-cart", JSON.stringify(state.items));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [state.items]);

  // ✅ Actions
  const addToCart = (product) => dispatch({ type: "ADD_TO_CART", payload: product });
  const removeFromCart = (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const updateQuantity = (id, qty) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: qty } });
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("god-statues-cart");
  };

  // ✅ Helpers
  const getTotalItems = () => state.items.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
