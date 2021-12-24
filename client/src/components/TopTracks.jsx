import SongListItem from './SongListItem'
import { useState, useEffect } from 'react'
import SpotifyWebApi from "spotify-web-api-node"
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  })

export default function TopTracks({setSelectedItem, setSelectedTrack}) {
    const { token: accessToken } = useContext(AuthContext)
    const[topTracks, setTopTracks] = useState([])
    const[timeRange, setTimeRange] = useState("short_term")

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
      }, [accessToken])

      useEffect(() => {
          spotifyApi.getMyTopTracks({
              limit:50,
              time_range: timeRange
          }).then(res => {
              setTopTracks(
                  res.body.items.map(item => {
                    let artists = ""
                    item.artists.forEach(artist => {
                        artists += `${artist.name}, `
                      })
                      artists = artists.substring(0, artists.length-2)
                    return {
                        id: item.id,
                        name: item.name,
                        artists: artists
                    }
                  })
              )
          })
      },[timeRange, accessToken])

    return (
            <div className="songs">
                <div className="songs-head">
                    <h3 className="list-title">Your Top Tracks</h3> 
                    <div className="time-range-buttons">
                        <button 
                            className={`time-btn ${timeRange === "short_term" && 'active'}`}
                            onClick={() => setTimeRange("short_term")}>
                                Last Month
                        </button>
                        <button
                            className={`time-btn ${timeRange === "medium_term" && 'active'}`}
                            onClick={() => setTimeRange("medium_term")}>
                                Last Six Months
                        </button>
                        <button
                            className={`time-btn ${timeRange === "long_term" && 'active'}`}
                            onClick={() => setTimeRange("long_term")}>
                                All Time
                        </button>
                    </div>  
                </div>
                <div className="list">
                {topTracks.map((track, index) => {
                        return <SongListItem key={index} track={track} accessToken={accessToken} setSelectedItem={setSelectedItem} setSelectedTrack={setSelectedTrack}/>
                    })}
                </div>
            </div>        
    )
}
