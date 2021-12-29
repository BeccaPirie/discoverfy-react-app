import Recommendations from "../components/Recommendations"
import useAuth from "../useAuth"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SpotifyWebApi from "spotify-web-api-node"
import SearchResults from "../components/SearchResults"

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  })

export default function Home({code}) {
    const accessToken = useAuth(code)
    const [selectedTrack, setSelectedTrack] = useState()
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [showSearch, setShowSearch] = useState(true)

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if(!search) return setSearchResults([])

        spotifyApi.searchTracks(search, {
            limit: 3,
        })
            .then(res => {
                setSearchResults(
                    res.body.tracks.items.map(item => {
                        let artists = ""
                        item.artists.forEach(artist => {
                            artists += `${artist.name}, `
                        })
                        artists = artists.substring(0, artists.length-2)

                      return {
                        id: item.id,
                        name: item.name,
                        artists: artists,
                        image: item.album.images[0].url,
                        uri: item.uri
                    }
                    })
                )
            })
    }, [search, accessToken])

    return (
        <>
            <nav>
                <Link to={"/"}>
                    <div className="discoverfy">Discoverfy</div>
                </Link>
            </nav>

            <div className="form">
               <input
                    type="search"
                    placeholder="Search for a track"
                    className="search-input"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={() => setShowSearch(true)}
                /> 

                {showSearch && <SearchResults
                    showSearch={showSearch}
                    searchResults={searchResults}
                    setShowSearch={setShowSearch}
                    setSelectedTrack={setSelectedTrack}
                />}
            </div>

            {selectedTrack && <Recommendations track={selectedTrack} />}
        </>
    )
}
