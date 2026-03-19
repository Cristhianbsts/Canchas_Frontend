import React from 'react';
import "../css/searchBar.css";

export default function SearchBar({ value, onChange, placeholder = "Buscar productos..." }) {
  return (
    <div className="input-group search-box shadow-sm rounded-pill overflow-hidden">
      <button className="btn btn-search bg-white border-0 px-3" type="button" disabled>
        <i className="bi bi-search text-muted"></i>
      </button>
      <input
        type="text"
        className="form-control border-0 bg-white py-2 shadow-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label="Buscar"
      />
    </div>
  );
}
