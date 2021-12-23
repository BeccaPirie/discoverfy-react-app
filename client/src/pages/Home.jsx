import RecentTracks from "../components/RecentTracks"
import TopTracks from "../components/TopTracks"
import useAuth from "../useAuth"
import { useState } from 'react'

export default function Home({code}) {
    useAuth(code)
    const [showMenuItems, setShowMenuItems] = useState(false)
    const [selectedItem, setSelectedItem] = useState("recenttracks")

    return (
        <>
            <nav>
                <div className="discoverfy"><a href="/">Discoverfy</a></div>
                <ul>
                    <li className="menu-icon"
                        onClick={() => setShowMenuItems(!showMenuItems)}>
                            <a href="#"><i className="fa fa-bars"></i></a>
                    </li>
                    <li className={`list-item top ${!showMenuItems && 'hide'}`}
                        onClick={() => setSelectedItem("recenttracks")}>
                            Recently Played Tracks
                    </li>
                    <li className={`list-item ${!showMenuItems && 'hide'}`}
                        onClick={() => setSelectedItem("toptracks")}>
                            Top Tracks
                    </li>
                </ul>
            </nav>
            {selectedItem === "recenttracks" && <RecentTracks />}
            {selectedItem === "toptracks" && <TopTracks />}
        </>
    )
}
