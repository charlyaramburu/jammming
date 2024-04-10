import React from 'react';
import './SearchResults.css';

function SearchResults({ searchResults, onAddTrack }) {
    console.log(searchResults[0]);
    if (searchResults.length === 0) {
        return <p>No results found. Please try another search.</p>
    }
    return (
        <div>
            {searchResults.map((track) => {
                // Ensure safe access to the artist's name with optional chaining and nullish coalescing
                const artistName = track.artists?.[0]?.name ?? "Unknown Artist";
                return (
                    <div className='SearchResults'>
                        <div className='Track'>
                            <div className='Track-information' key={track.id}>
                                <h3>{track.name}</h3>
                                <p>{artistName}</p>
                            </div>
                            <button className="saveToButton" id='plus-action' onClick={() => onAddTrack(track)}>+</button>
                        </div>
                    </div>
                );
            }
            )}
        </div >
    );
}

export default SearchResults;