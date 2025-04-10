import React from 'react';
import { StoreContext } from '../../context/StoreContext';
import './SearchFilter.css';

const SearchFilter = () => {
  const { 
    searchQuery, 
    setSearchQuery
  } = React.useContext(StoreContext);

  return (
    <div className="search-filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </div>
    </div>
  );
};

export default SearchFilter; 