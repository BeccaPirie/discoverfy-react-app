import RecommendationListItem from '../RecommendationListItem'

export default function Recommendations() {
    return (
        <div className="songs">
            <h3 className="list-title" id="recommendations-title">Recommendations for Song Name</h3>
            <div className="list">
                <RecommendationListItem />
                <RecommendationListItem />
                <RecommendationListItem />
                <RecommendationListItem />
            </div>
        </div>
    )
}
