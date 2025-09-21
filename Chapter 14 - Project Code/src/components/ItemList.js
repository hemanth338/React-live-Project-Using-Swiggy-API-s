import { useDispatch } from "react-redux";
import { addItem, removeSpecificItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items, isCart = false }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // dispatch an action
    dispatch(addItem(item));
  };

  const handleRemoveItem = (index) => {
    // dispatch remove specific item action
    dispatch(removeSpecificItem(index));
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={`${item.card.info.id}-${index}`}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            margin: "10px",
            textAlign: "left",
            borderBottom: "2px solid #e2e8f0",
          }}
        >
          <div style={{ width: "75%" }}>
            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <span style={{ fontWeight: "500" }}>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "#666" }}>
              {item.card.info.description}
            </p>
          </div>
          <div style={{ width: "25%", padding: "16px", position: "relative" }}>
            <div style={{ position: "absolute" }}>
              {isCart ? (
                // Remove button for cart
                <button
                  style={{
                    padding: "8px 16px",
                    marginLeft: "32px",
                    marginTop: "90px",
                    borderRadius: "8px",
                    backgroundColor: "#e53e3e",
                    color: "white",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => handleRemoveItem(index)}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "#e53e3e";
                    e.target.style.border = "1px solid #e53e3e";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#e53e3e";
                    e.target.style.color = "white";
                    e.target.style.border = "none";
                  }}
                >
                  Remove -
                </button>
              ) : (
                // Add button for menu
                <button
                  style={{
                    padding: "8px 16px",
                    marginLeft: "32px",
                    marginTop: "90px",
                    borderRadius: "8px",
                    backgroundColor: "#000",
                    color: "white",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => handleAddItem(item)}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "black";
                    e.target.style.border = "1px solid #000";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#000";
                    e.target.style.color = "white";
                    e.target.style.border = "none";
                  }}
                >
                  Add +
                </button>
              )}
            </div>
            {item.card.info.imageId ? (
              <img
                src={CDN_URL + item.card.info.imageId}
                alt={item.card.info.name}
                style={{ width: "100%", borderRadius: "6px" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "120px",
                  backgroundColor: "#f7fafc",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a0aec0",
                  fontSize: "14px",
                }}
              >
                No Image
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
