import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex, dummy }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div>
      {/*Accordion Header */}
      <div
        style={{
          width: "50%",
          margin: "16px auto",
          backgroundColor: "#f9fafb",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>
            {data.title} ({data.itemCards.length})
          </span>
          <span>🔽</span>
        </div>
        {/* Accordion Body */}

        {showItems && <ItemList items={data.itemCards} dummy={dummy} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
