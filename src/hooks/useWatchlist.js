import { useSyncExternalStore } from "react"
import { clearWatchlist, getSnapshot, isInWatchlist, subscribe, toggleWatchlist } from "../store/watchlist"

function useWatchlist() {
    const items = useSyncExternalStore(subscribe, getSnapshot)
    return {
        items,
        has: (mediaType, id) => isInWatchlist(items, mediaType, id),
        toggle: toggleWatchlist,
        clear: clearWatchlist,
    }
}

export default useWatchlist
