import { useEffect, useState } from "react"
import { fetchApi } from "../utils/api"


function useFetch(url) {
    // Tag each result with the url it belongs to, so a url change immediately
    // reads as "loading" without having to reset state inside the effect.
    const [result, setResult] = useState({ url: null, data: null, error: null })

    useEffect(() => {
        // Abort the previous request so a slow response for an old url
        // can never overwrite the data for the current one.
        const controller = new AbortController()

        fetchApi(url, undefined, { signal: controller.signal })
            .then(data => setResult({ url, data, error: null }))
            .catch(error => {
                if (!controller.signal.aborted) setResult({ url, data: null, error })
            })

        return () => controller.abort()
    }, [url])

    const isCurrent = result.url === url
    return {
        data: isCurrent ? result.data : null,
        isLoading: !isCurrent,
        error: isCurrent ? result.error : null,
    }
}

export default useFetch
