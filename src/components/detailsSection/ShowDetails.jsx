import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { VscPlayCircle } from "react-icons/vsc";
import useFetch from "../../hooks/useFetch"
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Img from '../Img';
import Rating from '../rating/Rating';
import CastList from "../castList/CastList";
import TrailerModal from "../trailerModal/TrailerModal";
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

const ShowDetails = ({ mediaType, id }) => {
    const [showVideo, setShowVideo] = useState(false)
    const { isLoading, data, error } = useFetch(`/${mediaType}/${id}`)
    const { data: creditsData } = useFetch(`/${mediaType}/${id}/credits`)
    const { data: videosData } = useFetch(`/${mediaType}/${id}/videos`)
    const closeVideo = useCallback(() => setShowVideo(false), [])

    useDocumentTitle(getTitle(data))

    if (isLoading) {
        return <div className="h-[60vh] flex justify-center items-center text-white text-[20px]">Loading ...</div>
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
    const runtime = formatRuntime(data.runtime ?? data.episode_run_time?.[0])
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
                    <div className="max-w-[350px] mx-auto">
                        <Img src={posterUrl} alt={getTitle(data)} className="rounded-xl" />
                    </div>
                    <div className="py-4">
                        <h1 className="mb-3 text-[26px] font-medium">
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
                        <div className="mb-6 flex items-center gap-5">
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
                            {runtime && <InfoItem label="Runtime" value={runtime} />}
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
