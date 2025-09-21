import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShimmerMenu from "./ShimmerMenu";
import RestaurantCategory from "./RestaurantCategory";
import { CDN_URL, MENU_API } from "../utils/constants";
import { FiClock } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [showIndex, setShowIndex] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    console.log("Menu JSON 👉", json);
    setResInfo(json.data);
  };

  if (resInfo === null) return <ShimmerMenu />;

  // Extract restaurant details
  const {
    name,
    cuisines,
    costForTwoMessage,
    cloudinaryImageId,
    avgRating,
    sla,
  } = resInfo?.cards[2]?.card?.card?.info || {};

  // Extract menu items
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="menu">
      <header className="menu-header">
        <div className="menu-header-left">
          <div className="menu-header-left">
            {cloudinaryImageId ? (
              <img src={CDN_URL + cloudinaryImageId} alt="Restaurant" />
            ) : (
              <div
                style={{
                  width: "150px",
                  height: "150px",
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
        <div className="menu-header-right">
          <div className="top">
            <h1>{name}</h1>
            <h3>{cuisines?.join(", ")}</h3>
          </div>
          <div className="bottom">
            <h4 className="avg-rating">
              <span className="icons">
                <AiOutlineStar />
              </span>
              <span>{avgRating}</span>
            </h4>
            <h4 className="time">
              <span className="icons">
                <FiClock />
              </span>
              <span>{sla?.deliveryTime} MINS</span>
            </h4>
            <h3>{costForTwoMessage}</h3>
          </div>
        </div>
      </header>

      <div className="menu-main">
        <h2>Menu</h2>
        {/* categories accordions */}
        {categories.map((category, index) => (
          <RestaurantCategory
            key={`${category?.card?.card.title}-${index}`}
            data={category?.card?.card}
            showItems={index === showIndex ? true : false}
            setShowIndex={() => setShowIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
