import SongListItem from './SongListItem'
import { useState, useEffect } from 'react'
import SpotifyWebApi from "spotify-web-api-node"
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  })
  
export default function RecentTracks() {
    const { token: accessToken } = useContext(AuthContext)
    const[recentTracks, setRecentTracks] = useState([])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
      }, [accessToken])

    useEffect(() => {
        spotifyApi.getMyRecentlyPlayedTracks({
            limit: 50
        }).then(res => {
            setRecentTracks(
                res.body.items.map(item => {
                    let artists = ""
                    item.track.artists.forEach(artist => {
                        artists += `${artist.name}, `
                      })
                      artists = artists.substring(0, artists.length-2)
                    return {
                        id: item.track.id,
                        name: item.track.name,
                        artists: artists
                    }
                })
            )
        })
    },[accessToken])    

    return (
        <div className="songs">
            <div className="songs-head">
                <h3 className="list-title">Your Recently Played Tracks</h3>   
            </div>
            <div className="list">
                {recentTracks.map((track, index) => {
                    return <SongListItem key={index} track={track} accessToken={accessToken}/>
                })}
            </div>
        </div>        
    )
}