import { useState, useEffect, useContext, useMemo } from 'react'
import SpotifyWebApi from "spotify-web-api-node"
import { AuthContext } from '../context/AuthContext'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  })

export default function RecommendationListItem({track, playAudio, pauseAudio, allAudio}) {
    const { token: accessToken } = useContext(AuthContext)
    const[image, setImage] = useState("")
    const previewAudio = useMemo(() => new Audio(track.preview), [])
    const[playing, setPlaying] = useState(false)
    // const previewAudio = allAudio[track.preview]
    // console.log(previewAudio)

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
      }, [accessToken])

      useEffect(() => {
          spotifyApi.getTrack(track.id).then(res => {
            setImage(res.body.album.images[0].url)
          })
      })

    const handleClick= () => {
        if(track.preview === null) return
        setPlaying(!playing)
    }
    useEffect(() => {
        let timeout
        if(playing) {
            previewAudio.play()
            timeout = setTimeout(() => {
                setPlaying(false)
            }, 30000)
            // playAudio(track.preview)
        } else {
            previewAudio.pause();
            clearTimeout(timeout)
            // pauseAudio(track.preview)
            previewAudio.currentTime = 0
        }
    }, [playing])

    return (
        // <a href={track.uri}>
           <div className="song-list-item recommend-item">
                <div className="song-details">
                    <img className="album-img rec-img" src={image} alt="album art" />
                    <p className="song-title">{track.name}</p>
                    <p className="artists-name">{track.artists}</p>
                </div>   
                <div className="btn-right">
                    <button className={track.preview === null ? "audio-btn preview-unavailable" : "audio-btn"} onClick={handleClick}>
                        <i className={playing ? "fa fa-pause":"fa fa-play"}></i>
                    </button>
                </div>
            </div> 
        // </a>
        
    )
}
