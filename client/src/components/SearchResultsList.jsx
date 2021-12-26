export default function SearchResultsList({track, setSelectedTrack, setShowSearch}) {

    const handleClick = () => {
        setSelectedTrack(track.id)
        setShowSearch(false)
    }

    return (
        <div className="song-list-item search-item" onClick={handleClick}>
            <div className="search-song-details">
            <img className="album-img" src={track.image} alt="album art" />
                <p className="song-title">{track.name}</p>
                <p className="artists-name">{track.artists}</p>
            </div>
        </div>
    )
}
