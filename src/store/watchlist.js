// Watchlist kept in localStorage. Components read it through useWatchlist(),
// which re-renders them whenever the list changes (in this tab or another).

const STORAGE_KEY = "moviex.watchlist"

const listeners = new Set()

const read = () => {
    try {
        const value = JSON.parse(localStorage.getItem(STORAGE_KEY))
        return Array.isArray(value) ? value : []
    } catch {
        return []
    }
}

let items = read()

const emit = () => listeners.forEach(listener => listener())

const write = (next) => {
    items = next
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
        // Storage can be unavailable (private mode, quota); keep the in-memory list.
    }
    emit()
}

export const itemKey = (mediaType, id) => `${mediaType}-${id}`

// Keep only what a Poster needs, so stored entries stay small.
const toEntry = (item, mediaType) => ({
    id: item.id,
    media_type: mediaType,
    title: item.title,
    name: item.name,
    poster_path: item.poster_path,
    vote_average: item.vote_average,
    release_date: item.release_date,
    first_air_date: item.first_air_date,
    addedAt: Date.now(),
})

export const isInWatchlist = (list, mediaType, id) =>
    list.some(entry => itemKey(entry.media_type, entry.id) === itemKey(mediaType, id))

export const toggleWatchlist = (item, mediaType) => {
    write(isInWatchlist(items, mediaType, item.id)
        ? items.filter(entry => itemKey(entry.media_type, entry.id) !== itemKey(mediaType, item.id))
        : [toEntry(item, mediaType), ...items])
}

export const clearWatchlist = () => write([])

export const subscribe = (listener) => {
    listeners.add(listener)
    const onStorage = (e) => {
        if (e.key !== STORAGE_KEY) return
        items = read()
        emit()
    }
    window.addEventListener("storage", onStorage)
    return () => {
        listeners.delete(listener)
        window.removeEventListener("storage", onStorage)
    }
}

export const getSnapshot = () => items
