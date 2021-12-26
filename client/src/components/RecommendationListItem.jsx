import { useState, useEffect } from 'react'
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  })

export default function RecommendationListItem({track, accessToken}) {
    const[image, setImage] = useState("")
    const[playing, setPlaying] = useState(false)

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
      }, [accessToken])

      useEffect(() => {
          spotifyApi.getTrack(track.id).then(res => {
            setImage(res.body.album.images[0].url)
          })
      })

    const playPreview = () => {
        const audio = new Audio(track.preview)
        if(!playing) {
            audio.play()
            setPlaying(true)
        } else {
            audio.pause()
            setPlaying(false)
        }  
    }

    return (
        <a href={track.uri}>
           <div className="song-list-item recommend-item">
                <div className="song-details">
                    <img className="album-img rec-img" src={image} alt="album art" />
                    <p className="song-title">{track.name}</p>
                    <p className="artists-name">{track.artists}</p>
                </div>   
                <div className="btn-right">
                    <button className="audio-btn" onClick={playPreview}><i className="fa fa-play"></i></button>
                    <audio className="recommend-audio">
                        <source src={track.preview_url} type="audio/mpeg" />
                    </audio>
                </div>
            </div> 
        </a>
        
    )
}
