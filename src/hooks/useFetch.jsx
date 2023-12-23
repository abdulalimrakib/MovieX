import { useEffect, useState } from "react"
import { fetchApi } from "../utils/api"


function useFetch(url) {
    const [data, setData] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchApi(url)
            .then(res => {
                setIsLoading(false)
                setData(res)
            })
            .catch(e => {
                setIsLoading(false)
                setError(e)
            })
    }, [url])

    return { data, isLoading, error }
}

export default useFetch