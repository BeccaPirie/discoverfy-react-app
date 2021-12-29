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
    const[playlistSaved, setPlaylistSaved] = useState(false)
    const[audioPlaying, setAudioPlaying] = useState("")
    // let allAudio = []

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
                // allAudio.push(new Audio(track.preview_url))
                // console.log(allAudio)
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

    const handleCreatePlaylist = async() => {
      let uris = []
      recommendations.forEach(recentTrack => {
          uris.push(recentTrack.uri)
      })

      spotifyApi.createPlaylist(`Discoverfy- ${playedTrack}`)
          .then(res => {
              spotifyApi.addTracksToPlaylist(res.body.id, uris)
          })
          .then(() => {
            setPlaylistSaved(true)
            const hideMessage = setTimeout(() => {
              setPlaylistSaved(false)
            }, 2000)
          })
    }

    // const playAudio = (audio) => {
    //   if(audioPlaying) {
    //     allAudio[audioPlaying].pause()
    //   }
    //   allAudio[audio].play()
    //   setAudioPlaying(audio)
    // }

    // const pauseAudio = (audio) => {
    //   console.log(audio)
    //   setAudioPlaying(null)
    //   allAudio[audio].pause()
    // }

    return (
      <div className="songs">
          <h3 className="list-title" id="recommendations-title">Recommendations for {playedTrack}</h3>
          <div className="create-playlist-div">
            <button className="create-playlist-btn" onClick={handleCreatePlaylist}>
                Create Playlist
            </button>
          </div>
          {playlistSaved && <div className="playlist-saved">Playlist saved!</div>}
          <div className="list">
          {recommendations.map((track, index) => {
                  return <RecommendationListItem
                    key={index}
                    track={track}
                    // playAudio={playAudio}
                    // pauseAudio={pauseAudio}
                    // allAudio={allAudio}
                    />
              })}
          </div>
      </div>
    )
}
