import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { VscPlayCircle } from "react-icons/vsc";
import useFetch from "../../hooks/useFetch"
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Img from '../Img';
import Rating from '../rating/Rating';
import CastList from "../castList/CastList";
import TrailerModal from "../trailerModal/TrailerModal";
import WatchlistButton from "../watchlistButton/WatchlistButton";
import WatchProviders from "../watchProviders/WatchProviders";
import noPoster from "../../assets/no-poster.webp";
import { IMAGE_SIZES, formatDate, getReleaseDate, getTitle, imageUrl } from "../../utils/media";

const WRITER_JOBS = ["Writer", "Screenplay", "Story"]

const uniqueNames = (people) => [...new Set(people.map(p => p.name))]

const findTrailerKey = (videos = []) => {
    const youtube = videos.filter(v => v.site === "YouTube")
    return (youtube.find(v => v.type === "Trailer") ?? youtube[0])?.key
}

const formatRuntime = (minutes) => {
    if (!minutes) return ""
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return h ? `${h}h ${m}m` : `${m}m`
}

const InfoItem = ({ label, value }) => (
    <div>
        <span className="text-[12px] md:text-[14px]">{label}: </span>
        <span className="text-[12px] md:text-[14px] ml-1 text-gray-400">{value}</span>
    </div>
)

InfoItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
};

// Placeholder with the same layout as the loaded page, so nothing jumps.
const DetailsSkeleton = () => (
    <div className="flex justify-center px-[10px] xl:px-[150px] pt-[50px] md:pt-[100px] animate-pulse" aria-hidden="true">
        <div className="w-full lg:grid gap-8 grid-cols-[minmax(0,350px)_1fr]">
            <div className="w-[240px] md:w-[350px] max-w-full aspect-[2/3] mx-auto rounded-xl bg-[#0a2955]" />
            <div className="py-4 space-y-5">
                <div className="h-9 w-2/3 rounded-md bg-[#0a2955]" />
                <div className="h-4 w-1/3 rounded-md bg-[#0a2955]" />
                <div className="flex gap-2">
                    {[0, 1, 2].map(i => <div key={i} className="h-6 w-20 rounded-md bg-[#0a2955]" />)}
                </div>
                <div className="flex gap-4 items-center">
                    <div className="w-[55px] h-[55px] rounded-full bg-[#0a2955]" />
                    <div className="h-11 w-40 rounded-full bg-[#0a2955]" />
                </div>
                <div className="space-y-2">
                    <div className="h-4 w-full rounded-md bg-[#0a2955]" />
                    <div className="h-4 w-11/12 rounded-md bg-[#0a2955]" />
                    <div className="h-4 w-4/5 rounded-md bg-[#0a2955]" />
                </div>
            </div>
        </div>
    </div>
)

const ShowDetails = ({ mediaType, id }) => {
    const [showVideo, setShowVideo] = useState(false)
    const { isLoading, data, error } = useFetch(`/${mediaType}/${id}`)
    const { data: creditsData } = useFetch(`/${mediaType}/${id}/credits`)
    const { data: videosData } = useFetch(`/${mediaType}/${id}/videos`)
    const closeVideo = useCallback(() => setShowVideo(false), [])

    useDocumentTitle(getTitle(data))

    if (isLoading) {
        return <DetailsSkeleton />
    }

    if (error || !data) {
        const notFound = error?.response?.status === 404
        return (
            <div className="h-[60vh] flex justify-center items-center text-[#c12e5b] text-[20px] md:text-[28px] px-4 text-center">
                {notFound ? "This title could not be found." : "Something went wrong. Please try again later."}
            </div>
        )
    }

    const crew = creditsData?.crew ?? []
    const directors = uniqueNames(crew.filter(p => p.job === "Director"))
    const writers = uniqueNames(crew.filter(p => WRITER_JOBS.includes(p.job)))
    const creators = uniqueNames(data.created_by ?? [])
    const trailerKey = findTrailerKey(videosData?.results)
    const releaseDate = getReleaseDate(data)
    const year = formatDate(releaseDate, "YYYY")
    // TMDB often leaves episode_run_time empty for TV; fall back to the latest episode.
    const runtime = formatRuntime(data.runtime ?? data.episode_run_time?.[0] ?? data.last_episode_to_air?.runtime)
    const seasons = data.number_of_seasons
        ? `${data.number_of_seasons} season${data.number_of_seasons > 1 ? "s" : ""}${data.number_of_episodes ? ` · ${data.number_of_episodes} episodes` : ""}`
        : ""
    const backdropUrl = imageUrl(data.backdrop_path, IMAGE_SIZES.backdrop)
    const posterUrl = imageUrl(data.poster_path, IMAGE_SIZES.posterLarge, noPoster)

    return (
        <div className="relative">
            {backdropUrl && (
                <div className="absolute inset-0 h-[100vh] opacity-20 overflow-hidden" aria-hidden="true">
                    <Img src={backdropUrl} />
                    <div className="opacity-layer" />
                </div>
            )}
            <div className="relative flex justify-center items-center px-[10px] xl:px-[150px]">
                <div className="text-white lg:grid gap-8 grid-cols-[minmax(0,350px)_1fr] pt-[50px] md:pt-[100px] mb-5 md:mb-10">
                    <div className="w-[240px] md:w-[350px] max-w-full aspect-[2/3] mx-auto self-start rounded-xl overflow-hidden">
                        <Img src={posterUrl} alt={getTitle(data)} className="rounded-xl" />
                    </div>
                    <div className="py-4">
                        <h1 className="mb-3 text-[24px] md:text-[34px] font-semibold leading-tight">
                            {getTitle(data)}{year && ` (${year})`}
                        </h1>
                        {data.tagline && <p className="mb-6 italic text-gray-500">{data.tagline}</p>}
                        {data.genres?.length > 0 && (
                            <ul className="mb-6 flex flex-wrap gap-2">
                                {data.genres.map(g => (
                                    <li key={g.id} className="text-[12px] px-2 py-1 rounded-sm bg-[#da2f68]">{g.name}</li>
                                ))}
                            </ul>
                        )}
                        <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                            <div className="w-[55px]">
                                <Rating value={data.vote_average} />
                            </div>
                            {trailerKey && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setShowVideo(true)}
                                        className="flex gap-2 items-center text-[20px] hover:text-[#DD3B5D] duration-300"
                                    >
                                        <VscPlayCircle className="text-[55px]" /> Watch trailer
                                    </button>
                                    <TrailerModal show={showVideo} close={closeVideo} videoKey={trailerKey} />
                                </>
                            )}
                            <WatchlistButton item={data} mediaType={mediaType} variant="full" />
                        </div>
                        {data.overview && (
                            <div>
                                <h2 className="text-[18px] md:text-[20px]">Overview</h2>
                                <p className="text-[14px] md:text-[16px] text-gray-300 my-2 leading-relaxed">{data.overview}</p>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-4 justify-between items-center py-5 border-b-[0.5px] border-gray-500">
                            {data.status && <InfoItem label="Status" value={data.status} />}
                            {releaseDate && <InfoItem label={mediaType === "tv" ? "First aired" : "Release date"} value={formatDate(releaseDate)} />}
                            {runtime && <InfoItem label={mediaType === "tv" ? "Episode runtime" : "Runtime"} value={runtime} />}
                            {seasons && <InfoItem label="Seasons" value={seasons} />}
                        </div>
                        {directors.length > 0 && (
                            <div className="py-3 md:py-5 border-b-[0.5px] border-gray-500">
                                <InfoItem label={directors.length > 1 ? "Directors" : "Director"} value={directors.join(", ")} />
                            </div>
                        )}
                        {creators.length > 0 && (
                            <div className="py-3 md:py-5 border-b-[0.5px] border-gray-500">
                                <InfoItem label="Created by" value={creators.join(", ")} />
                            </div>
                        )}
                        {writers.length > 0 && (
                            <div className="py-3 md:py-5 border-b-[0.5px] border-gray-500">
                                <InfoItem label={writers.length > 1 ? "Writers" : "Writer"} value={writers.join(", ")} />
                            </div>
                        )}
                        <WatchProviders mediaType={mediaType} id={id} />
                    </div>
                </div>
            </div>
            <div className="relative">
                <CastList casts={creditsData?.cast} />
            </div>
        </div>
    )
}

ShowDetails.propTypes = {
    mediaType: PropTypes.oneOf(["movie", "tv"]).isRequired,
    id: PropTypes.string.isRequired,
};

export default ShowDetails
