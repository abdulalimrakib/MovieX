import { useParams } from "react-router-dom"
import ShowExplore from "../components/explore/ShowExplore"
import useDocumentTitle from "../hooks/useDocumentTitle"
import { isValidMediaType } from "../utils/media"
import NotFound from "./NotFound"

function Explore() {
    const { mediaType } = useParams()
    useDocumentTitle(mediaType === "tv" ? "Explore TV Shows" : "Explore Movies")

    if (!isValidMediaType(mediaType)) return <NotFound />

    // Filters live in the URL; the key just gives each media type a fresh component.
    return <ShowExplore key={mediaType} mediaType={mediaType} />
}

export default Explore
