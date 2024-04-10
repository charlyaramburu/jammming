import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onUpdateSearchQuery }) {
    const [search, setSearch] = useState("");

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateSearchQuery(search);
    };

    return (
        <form onSubmit={handleSubmit} className='SearchBar'>
            <input
                onChange={handleChange}
                type="text"
                value={search}
                placeholder="Enter a song title..."
            />
            <button className= 'SearchButton' type="submit">Search</button>
        </form>
    );
};

export default SearchBar;