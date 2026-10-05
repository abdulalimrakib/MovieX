import PropTypes from "prop-types";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import useWatchlist from "../../hooks/useWatchlist";
import { getTitle } from "../../utils/media";

/**
 * Adds/removes a title from the watchlist. `icon` is the small round button
 * shown on posters; `full` is the labelled button on the details page.
 */
const WatchlistButton = ({ item, mediaType, variant = "icon", className = "" }) => {
    const { has, toggle } = useWatchlist()
    const saved = has(mediaType, item.id)
    const label = `${saved ? "Remove" : "Add"} ${getTitle(item)} ${saved ? "from" : "to"} watchlist`
    const Icon = saved ? FaBookmark : FaRegBookmark

    const onClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(item, mediaType)
    }

    if (variant === "full") {
        return (
            <button
                type="button"
                onClick={onClick}
                aria-pressed={saved}
                aria-label={label}
                className={`flex gap-2 items-center h-11 px-4 rounded-full text-[15px] ring-1 transition-colors ${saved ? "bg-[#da2f68] ring-[#da2f68] text-white" : "ring-white/40 text-white hover:bg-white/10"} ${className}`}
            >
                <Icon /> {saved ? "In watchlist" : "Add to watchlist"}
            </button>
        )
    }

    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={saved}
            aria-label={label}
            title={saved ? "Remove from watchlist" : "Add to watchlist"}
            className={`flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full text-[13px] md:text-[15px] backdrop-blur-sm ring-1 transition ${saved ? "bg-[#da2f68] ring-[#da2f68] text-white opacity-100" : "bg-black/60 ring-white/25 text-white hover:bg-[#da2f68] md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100"} ${className}`}
        >
            <Icon />
        </button>
    )
}

WatchlistButton.propTypes = {
    item: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
    mediaType: PropTypes.oneOf(["movie", "tv"]).isRequired,
    variant: PropTypes.oneOf(["icon", "full"]),
    className: PropTypes.string,
};

export default WatchlistButton
