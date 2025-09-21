import { CDN_URL } from "../utils/constants";
import { FiClock } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";

const RestaurantCard = ({ resData }) => {
  // Destructure directly from Swiggy API response (info object)
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    resData;

  return (
    <div className="res-card">
      <div className="res-img">
        {cloudinaryImageId ? (
          <img
            className="res-logo"
            src={CDN_URL + cloudinaryImageId}
            alt={name}
          />
        ) : null}
      </div>

      <div className="res-card-content">
        <h3>{name}</h3>
        <hr />
        <em>{cuisines?.join(", ")}</em>
        <h4 className="avg-rating">
          <span className="icons">
            <AiOutlineStar />
          </span>
          <span>{avgRating} stars</span>
        </h4>
        <h4 className="item-price">{costForTwo}</h4>
        <h4 className="time">
          <span className="icons">
            <FiClock />
          </span>
          <span>{sla?.deliveryTime} minutes</span>
        </h4>
      </div>
    </div>
  );
};

// Higher Order Component for Promoted Restaurants
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div style={{ position: "relative" }}>
        <label
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "#ff6b6b",
            color: "white",
            padding: "5px 10px",
            fontSize: "12px",
            borderRadius: "5px",
            zIndex: 1,
            fontWeight: "bold",
          }}
        >
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
