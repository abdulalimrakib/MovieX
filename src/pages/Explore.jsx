import { useParams } from "react-router-dom"
import ShowExplore from "../components/explore/ShowExplore"
import useDocumentTitle from "../hooks/useDocumentTitle"
import { isValidMediaType } from "../utils/media"
import NotFound from "./NotFound"

function Explore() {
    const { mediaType } = useParams()
    useDocumentTitle(mediaType === "tv" ? "Explore TV Shows" : "Explore Movies")

    if (!isValidMediaType(mediaType)) return <NotFound />

    // The key resets genre/sort filters when switching between movies and TV.
    return <ShowExplore key={mediaType} mediaType={mediaType} />
}

export default Explore
