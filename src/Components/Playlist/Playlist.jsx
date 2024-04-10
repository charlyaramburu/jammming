import { useState } from "react";
import "./Playlist.css";

function Playlist({ playlistName, onNameChange, playlistTracks, onRemoveTrack, onSave }) {

    const [name, setName] = useState(playlistName);
    const handleNameChange = (e) => {
        setName(e.target.value);
        onNameChange(e.target.value);
    };

    return (
        <div className="Playlist-name">
            <input
                id="playlistName"
                value={name}
                onChange={handleNameChange}
                placeholder="Set Playlist Name"
            />
            <div className="Playlist-tracks">
                {playlistTracks.map((track) => {
                    const artistName = track.artists?.[0]?.name ?? "Unknown Artist";
                    return (
                        <div className='Playlist'>
                            <div key={track.id} className="Track">
                                <div className='Track-information'>
                                    <h3>{track.name}</h3>
                                    <p>{artistName}</p>
                                </div>
                                <button id='removeButton' onClick={() => onRemoveTrack(track)}>-</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;