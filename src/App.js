import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import Search from "./Components/SearchBar/Search";
import { useState } from "react";
import SearchResults from "./Components/SearchResults/SearchResults";
import Playlist from "./Components/Playlist/Playlist";
import Spotify from "./util/Spotify";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  // This function updates the search query state.
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };
  // State to hold search results and function to update it
  const [searchResults, setSearchResults] = useState([]);
  // State to update the playlist name.
  const [playlistName, setPlaylistName] = useState("Set the Playlist Name...");
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };
  // State to update the playlist tracks.
  const [playlistTracks, setPlaylistTracks] = useState([]);
  // Function to update the playlist tracks.
  const addTrack = (track) => {
    if (playlistTracks.find((playlistTrack) => playlistTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track]);
  };
  // Function to remove a track from the playlist.
  const removeTrack = (track) => {
    setPlaylistTracks(
      playlistTracks.filter((playlistTrack) => playlistTrack.id !== track.id)
    );
  };
  // Function to save the playlist.
  const savePlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  };

  return (
    <div className="App">
      <h1>Jammming App</h1>
      <p>Search for your favorite songs and save a playlist to your Spotify account!</p>
      <SearchBar onUpdateSearchQuery={updateSearchQuery} />
      <Search query={searchQuery} onResultsFetched={setSearchResults} />
      <div className="Playlist-Creator">
        <div className="SearchResults">
          <h2>Search Results</h2>
          <SearchResults searchResults={searchResults} onAddTrack={addTrack} />
        </div>
        <div className="Playlist">
          <h2>Create Playlist</h2>
          <Playlist
            playlistName={playlistName}
            onNameChange={updatePlaylistName}
            playlistTracks={playlistTracks}
            onRemoveTrack={removeTrack}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
