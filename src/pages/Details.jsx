import { useParams } from "react-router-dom"
import ShowDetails from "../components/detailsSection/ShowDetails"
import MediaCarousel from "../components/mediaCarousel/MediaCarousel"
import { isValidMediaType } from "../utils/media"
import NotFound from "./NotFound"


function Details() {
  const { mediaType, id } = useParams()

  if (!isValidMediaType(mediaType) || !/^\d+$/.test(id)) return <NotFound />

  const label = mediaType === "tv" ? "TV Shows" : "Movies"

  // Keyed by title so local state (e.g. an open trailer) resets when
  // navigating from one title straight to another.
  return (
    <div key={`${mediaType}-${id}`}>
      <ShowDetails mediaType={mediaType} id={id} />
      <MediaCarousel
        title={`Similar ${label}`}
        endpoint={() => `/${mediaType}/${id}/similar`}
        mediaType={mediaType}
        layout="details"
        hideWhenEmpty
      />
      <MediaCarousel
        title="Recommendations"
        endpoint={() => `/${mediaType}/${id}/recommendations`}
        mediaType={mediaType}
        layout="details"
        hideWhenEmpty
      />
    </div>
  )
}

export default Details
