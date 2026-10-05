import { useCallback, useEffect, useRef, useState } from "react"
import { fetchApi } from "../utils/api"

// TMDB refuses page numbers above 500, whatever total_pages says.
const MAX_PAGES = 500

const emptyState = { key: null, results: [], page: 0, totalPages: 0, error: null }

// TMDB pages can overlap when rankings shift between requests.
const mergeUnique = (prev, next) => {
    const seen = new Set(prev.map(item => `${item.media_type}-${item.id}`))
    return [...prev, ...next.filter(item => !seen.has(`${item.media_type}-${item.id}`))]
}

/**
 * Fetches a paginated TMDB list. Changing `url` or `params` starts over from
 * page 1 and cancels any in-flight request for the previous query.
 */
function usePaginatedFetch(url, params) {
    const paramsKey = JSON.stringify(params ?? {})
    const queryKey = `${url}?${paramsKey}`
    // State is tagged with the query it belongs to; anything for an older
    // query is treated as empty, so no reset is needed when the query changes.
    const [state, setState] = useState(emptyState)
    const controllerRef = useRef(null)

    const fetchPage = useCallback((page) => {
        controllerRef.current?.abort()
        const controller = new AbortController()
        controllerRef.current = controller

        fetchApi(url, { ...JSON.parse(paramsKey), page }, { signal: controller.signal })
            .then(res => setState(prev => ({
                key: queryKey,
                results: page === 1 || prev.key !== queryKey ? res.results : mergeUnique(prev.results, res.results),
                page,
                totalPages: Math.min(res.total_pages, MAX_PAGES),
                error: null,
            })))
            .catch(error => {
                if (controller.signal.aborted) return
                setState(prev => prev.key === queryKey ? { ...prev, error } : { ...emptyState, key: queryKey, error })
            })
    }, [url, paramsKey, queryKey])

    useEffect(() => {
        fetchPage(1)
        return () => controllerRef.current?.abort()
    }, [fetchPage])

    const current = state.key === queryKey ? state : emptyState
    const loadMore = useCallback(() => fetchPage(current.page + 1), [fetchPage, current.page])

    return {
        results: current.results,
        isLoading: state.key !== queryKey,
        error: current.error,
        hasMore: current.page < current.totalPages,
        loadMore,
    }
}

export default usePaginatedFetch
