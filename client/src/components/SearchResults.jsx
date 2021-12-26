import SearchResultsList from './SearchResultsList'

export default function SearchResults({showSearch, searchResults, setShowSearch, setSelectedTrack}) {
    return (
        <>
            {showSearch && 
              <div className="search-results">
                <div className="search-results-list">
                    {searchResults.map(track => {
                        return <SearchResultsList key={track.id} track={track} setShowSearch={setShowSearch} setSelectedTrack={setSelectedTrack}/>
                    })}
                </div>
            </div>   
           }
        </>
    )
}
