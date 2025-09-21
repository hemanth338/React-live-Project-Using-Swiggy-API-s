import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div style={{ textAlign: "center", margin: "20px", padding: "20px" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Cart
      </h1>
      <div style={{ width: "50%", margin: "0 auto" }}>
        {cartItems.length === 0 && (
          <h2
            style={{ fontSize: "20px", marginTop: "30px", fontWeight: "500" }}
          >
            Your cart is empty, Add some items to the cart 🛒.
          </h2>
        )}
        <ItemList items={cartItems} isCart={true} />
        {cartItems.length > 0 && (
          <button
            style={{
              padding: "10px 20px",
              margin: "10px",
              backgroundColor: "#e53e3e",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onClick={handleClearCart}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f56565")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#e53e3e")}
          >
            Clear Cart 🧹
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
