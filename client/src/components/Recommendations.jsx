import RecommendationListItem from './RecommendationListItem'
import { useState, useEffect } from 'react'
import SpotifyWebApi from "spotify-web-api-node"
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  })

export default function Recommendations({track}) {
    const { token: accessToken } = useContext(AuthContext)
    const[recommendations, setRecommendations] = useState([])
    const[playedTrack, setPlayedTrack] = useState("")

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
      }, [accessToken])

      useEffect(() => {
        spotifyApi.getTrack(track).then(res => {
          setPlayedTrack(res.body.name)
        })
    },[track])

      useEffect(() => {
          spotifyApi.getRecommendations({
              limit: 50,
              seed_tracks: track
          }).then(res => {
              setRecommendations(
                  res.body.tracks.map(track => {
                    let artists = ""
                    track.artists.forEach(artist => {
                      artists += `${artist.name}, `
                    })
                    artists = artists.substring(0, artists.length-2)
                    return {
                        id: track.id,
                        name: track.name,
                        artists: artists,
                        preview: track.preview_url,
                        uri: track.uri
                    }
                  })
              )
          })
      },[track, accessToken])

    return (
        <div className="songs">
            <h3 className="list-title" id="recommendations-title">Recommendations for {playedTrack}</h3>
            <div className="list">
            {recommendations.map((track, index) => {
                    return <RecommendationListItem key={index} track={track} accessToken={accessToken}/>
                })}
            </div>
        </div>
    )
}
