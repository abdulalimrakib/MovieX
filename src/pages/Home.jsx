import HeroBanner from "../components/heroBanner/HeroBanner"
import MediaCarousel from "../components/mediaCarousel/MediaCarousel"
import useDocumentTitle from "../hooks/useDocumentTitle"

const TIME_TABS = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
]

const MEDIA_TABS = [
  { label: "Movies", value: "movie", mediaType: "movie" },
  { label: "TV Shows", value: "tv", mediaType: "tv" },
]

function Home() {
  useDocumentTitle()

  return (
    <div>
      <HeroBanner />
      <div className="my-5 md:my-10 flex flex-col gap-5">
        <MediaCarousel title="Trending" tabs={TIME_TABS} endpoint={time => `/trending/all/${time}`} />
        <MediaCarousel title="What's Popular" tabs={MEDIA_TABS} endpoint={type => `/${type}/popular`} />
        <MediaCarousel title="Top Rated" tabs={MEDIA_TABS} endpoint={type => `/${type}/top_rated`} />
        <MediaCarousel title="Upcoming Movies" endpoint={() => "/movie/upcoming"} mediaType="movie" />
      </div>
    </div>
  )
}

export default Home
