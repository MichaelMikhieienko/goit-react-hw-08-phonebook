// Filter.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default Filter;
