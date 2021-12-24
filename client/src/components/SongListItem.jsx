import { useState, useEffect } from 'react'
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  })

export default function SongListItem({track, accessToken, setSelectedItem, setSelectedTrack}) {
    const[image, setImage] = useState("")

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
      }, [accessToken])

      useEffect(() => {
          spotifyApi.getTrack(track.id).then(res => {
            setImage(res.body.album.images[0].url)
          })
      })

      const handleClick = () => {
        setSelectedItem("recommendations")
        setSelectedTrack(track.id)
      }

    return (
        <div className="song-list-item">
            <div className="song-details">
            <img className="album-img" src={image} alt="album art" />
                <p className="song-title">{track.name}</p>
                <p className="artists-name">{track.artists}</p>
            </div>    
            <div className="btn-right">
                <button className="recommendations-btn" onClick={handleClick}>Find new music</button>
            </div>
        </div>
    )
}
