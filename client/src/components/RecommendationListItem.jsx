export default function RecommendationListItem() {
    return (
        <div className="song-list-item recommend-item">
                <div className="song-details">
                    <p className="song-title">song title</p>
                    <p className="artists-name">artist</p>
                </div>    
                <div className="btn-right">
                    <button className="audio-btn"><i className="fa fa-play"></i></button>
                    <audio className="recommend-audio">
                        <source src="" type="audio/mpeg" />
                    </audio>
                </div>
            </div>
    )
}
