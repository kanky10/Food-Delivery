import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import SearchFilter from "../SearchFilter/SearchFilter";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { food_list, loading, error, filterFoodList } = useContext(StoreContext);

  console.log("FoodDisplay - Category:", category);
  console.log("FoodDisplay - Food List:", food_list);

  // First filter by search query, then by category
  const filteredBySearch = filterFoodList();
  const filteredFoodList = filteredBySearch.filter(item => {
    const matchesCategory = category === "All" || category === item.category;
    console.log(`Item ${item.name} (${item.category}) matches category ${category}:`, matchesCategory);
    return matchesCategory;
  });

  console.log("Filtered food list:", filteredFoodList);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <SearchFilter />
      <div className="food-display-list">
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, index) => <FoodItem key={index} loading={true} />)
        ) : filteredFoodList.length === 0 ? (
          <div className="no-results">
            <h3>No items found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredFoodList.map((item, index) => {
            console.log("Rendering food item:", item);
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                category={item.category}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
