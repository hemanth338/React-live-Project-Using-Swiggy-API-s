// RestaurantCard.js
import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  // Destructure directly from resData (no .data now)
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    resData;

  return (
    <div
      className="res-card"
      style={{
        backgroundColor: "#f0f0f0",
      }}
    >
      <img className="res-logo" src={CDN_URL + cloudinaryImageId} alt={name} />
      <h3>{name}</h3>
      <h4>{cuisines?.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo}</h4> {/* Already in ₹ format from API */}
      <h4>{sla?.deliveryTime} minutes</h4>
    </div>
  );
};

export default RestaurantCard;
