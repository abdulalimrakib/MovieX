import { useState } from "react"
import { Link } from "react-router-dom"
import { FaRegBookmark } from "react-icons/fa6"
import useWatchlist from "../hooks/useWatchlist"
import useDocumentTitle from "../hooks/useDocumentTitle"
import Poster from "../components/singlePoster/Poster"
import Switch from "../components/switchingTab/Switch"

const FILTER_TABS = [
    { label: "All", value: "all" },
    { label: "Movies", value: "movie" },
    { label: "TV Shows", value: "tv" },
]

function Watchlist() {
    const { items, clear } = useWatchlist()
    const [filter, setFilter] = useState("all")
    useDocumentTitle("Watchlist")

    const visible = filter === "all" ? items : items.filter(item => item.media_type === filter)

    return (
        <div className="min-h-[700px] pt-[80px] md:pt-[100px] pb-[40px] md:pb-[80px] px-2 md:px-5 lg:px-10">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6 lg:mb-10">
                <div>
                    <h1 className="text-white text-[24px]">My Watchlist</h1>
                    <p className="text-gray-400 text-[14px] mt-1">
                        {items.length} {items.length === 1 ? "title" : "titles"} saved on this device
                    </p>
                </div>
                {items.length > 0 && (
                    <div className="flex items-center gap-4">
                        <Switch tabs={FILTER_TABS} onChange={tab => setFilter(tab.value)} />
                        <button
                            type="button"
                            onClick={() => window.confirm("Remove every title from your watchlist?") && clear()}
                            className="text-[14px] text-gray-400 hover:text-[#da2f68] underline-offset-4 hover:underline"
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </div>

            {items.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                    <FaRegBookmark className="text-[56px] text-[#173d77]" />
                    <p className="text-white text-[18px] md:text-[22px]">Your watchlist is empty</p>
                    <p className="text-gray-400 max-w-[420px]">
                        Tap the bookmark on any poster to save movies and TV shows you want to watch later.
                    </p>
                    <Link to="/explore/movie" className="mt-2 text-white px-6 py-2 rounded-full bg-linear-to-r from-[#FD8E28] to-[#CD1563]">
                        Explore movies
                    </Link>
                </div>
            ) : visible.length === 0 ? (
                <p className="text-gray-400 text-[16px]">Nothing saved in this category yet.</p>
            ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-6 lg:gap-10">
                    {visible.map(item => (
                        <Poster key={`${item.media_type}-${item.id}`} posterData={item} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Watchlist
