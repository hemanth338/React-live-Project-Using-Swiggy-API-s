import React, { Component } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfRestaurants: [],
      filteredRestaurant: [],
      searchText: "",
    };
  }

  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.30070&lng=80.46390&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    // Extract latest restaurant list
    const restaurants =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];
    this.setState({
      listOfRestaurants: restaurants,
      filteredRestaurant: restaurants,
    });
  };

  handleSearch = () => {
    const { listOfRestaurants, searchText } = this.state;
    const filtered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    this.setState({ filteredRestaurant: filtered });
  };

  handleTopRated = () => {
    const { listOfRestaurants } = this.state;
    const filteredList = listOfRestaurants.filter(
      (res) => parseFloat(res.info.avgRating) > 4.4
    );
    this.setState({ filteredRestaurant: filteredList });
  };

  render() {
    const { listOfRestaurants, filteredRestaurant, searchText } = this.state;
    if (listOfRestaurants.length === 0) {
      return <Shimmer />;
    }
    return (
      <div className="body">
        <div className="filter">
          <div className="search">
            <input
              type="text"
              placeholder="Search a restaurant you want..."
              className="searchBox"
              value={searchText}
              onChange={(e) => this.setState({ searchText: e.target.value })}
            />
            <button onClick={this.handleSearch}>Search</button>
          </div>
          <button className="filter-btn" onClick={this.handleTopRated}>
            Top Rated Restaurants
          </button>
        </div>
        <div className="res-container">
          {filteredRestaurant.map((restaurant) => (
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              <RestaurantCard resData={restaurant.info} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Body;
