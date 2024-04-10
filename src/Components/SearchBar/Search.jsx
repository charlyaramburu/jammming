import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import Spotify from "../../util/Spotify";

// Fetch Spotify API
function Search({ query, onResultsFetched }) {
    
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedQuery = useDebounce(query, 500);
    // Function to call the Spotify API
    useEffect(() => {
        if (!debouncedQuery) return;
        const performSearch = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const results = await Spotify.search(debouncedQuery);
                onResultsFetched(results);
            } catch (error) {
                setError(error);
                console.error("Search failed:", error);
            } finally {
                setIsLoading(false);
            }
        };
        performSearch();
    }, [debouncedQuery, onResultsFetched]);

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Search;