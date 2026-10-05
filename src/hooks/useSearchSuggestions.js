import { useEffect, useState } from "react"
import { fetchApi } from "../utils/api"
import useDebouncedValue from "./useDebouncedValue"

const MIN_LENGTH = 2
const MAX_SUGGESTIONS = 6

/** Top movie/TV matches for a search box, fetched after the user pauses typing. */
function useSearchSuggestions(query, { delay = 300 } = {}) {
    const term = useDebouncedValue(query.trim(), delay)
    // Results are tagged with the term they belong to, so stale ones are ignored.
    const [result, setResult] = useState({ term: "", items: [] })
    const enabled = term.length >= MIN_LENGTH

    useEffect(() => {
        if (!enabled) return
        const controller = new AbortController()
        fetchApi("/search/multi", { query: term }, { signal: controller.signal })
            .then(res => setResult({
                term,
                items: (res.results ?? [])
                    .filter(item => item.media_type === "movie" || item.media_type === "tv")
                    .slice(0, MAX_SUGGESTIONS),
            }))
            .catch(() => {
                if (!controller.signal.aborted) setResult({ term, items: [] })
            })
        return () => controller.abort()
    }, [term, enabled])

    const isCurrent = enabled && result.term === term
    return {
        items: isCurrent ? result.items : [],
        // Still typing, or waiting for the response for the latest term.
        isLoading: query.trim().length >= MIN_LENGTH && (term !== query.trim() || !isCurrent),
    }
}

export default useSearchSuggestions
