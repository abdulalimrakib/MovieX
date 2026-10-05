import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// BrowserRouter keeps the old scroll position; start each new page at the top.
function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

export default ScrollToTop
