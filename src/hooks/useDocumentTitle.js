import { useEffect } from "react"

const APP_NAME = "MovieX"

function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} | ${APP_NAME}` : APP_NAME
    }, [title])
}

export default useDocumentTitle
