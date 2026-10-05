import { useEffect, useState } from "react"

// Returns `value` once it has stopped changing for `delay` ms.
function useDebouncedValue(value, delay) {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debounced
}

export default useDebouncedValue
