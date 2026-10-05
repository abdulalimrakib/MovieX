import PropTypes from "prop-types"
import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import useDocumentTitle from "../hooks/useDocumentTitle"
import Img from "../components/Img"
import Poster from "../components/singlePoster/Poster"
import avatar from "../assets/avatar.webp"
import { IMAGE_SIZES, formatDate, imageUrl } from "../utils/media"
import NotFound from "./NotFound"

const BIO_PREVIEW_LENGTH = 600
const KNOWN_FOR_COUNT = 18

const ageOn = (birthday, endDate) => {
    const end = endDate ? new Date(endDate) : new Date()
    const start = new Date(birthday)
    let age = end.getFullYear() - start.getFullYear()
    if (end < new Date(end.getFullYear(), start.getMonth(), start.getDate())) age--
    return age
}

// Most-voted credits first, one entry per title, only titles we can link to.
const pickKnownFor = (credits) => {
    const seen = new Set()
    return [...(credits?.cast ?? []), ...(credits?.crew ?? [])]
        .filter(c => c.media_type === "movie" || c.media_type === "tv")
        .sort((a, b) => (b.vote_count ?? 0) - (a.vote_count ?? 0))
        .filter(c => {
            const key = `${c.media_type}-${c.id}`
            if (seen.has(key)) return false
            seen.add(key)
            return true
        })
        .slice(0, KNOWN_FOR_COUNT)
}

const Fact = ({ label, children }) => (
    <div>
        <dt className="text-white text-[14px]">{label}</dt>
        <dd className="text-gray-400 text-[14px] mt-1">{children}</dd>
    </div>
)

Fact.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node,
}

function Person() {
    const { id } = useParams()
    const valid = /^\d+$/.test(id)
    const { data, isLoading, error } = useFetch(`/person/${valid ? id : 0}`)
    const { data: credits } = useFetch(`/person/${valid ? id : 0}/combined_credits`)
    const [expanded, setExpanded] = useState(false)
    const knownFor = useMemo(() => pickKnownFor(credits), [credits])

    useDocumentTitle(data?.name)

    if (!valid || error?.response?.status === 404) return <NotFound />

    if (isLoading) {
        return (
            <div className="pt-[80px] md:pt-[110px] px-3 lg:px-10 flex flex-col md:flex-row gap-8 animate-pulse" aria-hidden="true">
                <div className="w-[200px] md:w-[300px] aspect-[2/3] rounded-xl bg-[#0a2955] mx-auto md:mx-0" />
                <div className="flex-1 space-y-4">
                    <div className="h-8 w-1/2 rounded-md bg-[#0a2955]" />
                    <div className="h-4 w-full rounded-md bg-[#0a2955]" />
                    <div className="h-4 w-5/6 rounded-md bg-[#0a2955]" />
                    <div className="h-4 w-2/3 rounded-md bg-[#0a2955]" />
                </div>
            </div>
        )
    }

    if (error || !data) {
        return <div className="h-[60vh] flex justify-center items-center text-[#c12e5b] text-[20px] px-4 text-center">Something went wrong. Please try again later.</div>
    }

    const bio = data.biography ?? ""
    const longBio = bio.length > BIO_PREVIEW_LENGTH
    const shownBio = expanded || !longBio ? bio : bio.slice(0, BIO_PREVIEW_LENGTH).trimEnd() + "…"

    return (
        <div className="pt-[80px] md:pt-[110px] pb-[40px] md:pb-[80px] px-3 lg:px-10 text-white">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <aside className="md:w-[300px] shrink-0">
                    <div className="w-[200px] md:w-[300px] aspect-[2/3] mx-auto md:mx-0 rounded-xl overflow-hidden bg-[#0a2955]">
                        <Img src={imageUrl(data.profile_path, IMAGE_SIZES.posterLarge, avatar)} alt={data.name} />
                    </div>
                    <dl className="mt-6 grid grid-cols-2 md:grid-cols-1 gap-4">
                        {data.known_for_department && <Fact label="Known for">{data.known_for_department}</Fact>}
                        {data.birthday && (
                            <Fact label="Born">
                                {formatDate(data.birthday)}
                                {!data.deathday && ` (${ageOn(data.birthday)} years old)`}
                            </Fact>
                        )}
                        {data.deathday && (
                            <Fact label="Died">
                                {formatDate(data.deathday)}
                                {data.birthday && ` (aged ${ageOn(data.birthday, data.deathday)})`}
                            </Fact>
                        )}
                        {data.place_of_birth && <Fact label="Place of birth">{data.place_of_birth}</Fact>}
                    </dl>
                </aside>

                <div className="flex-1 min-w-0">
                    <h1 className="text-[28px] md:text-[40px] font-semibold leading-tight">{data.name}</h1>
                    <section className="mt-5">
                        <h2 className="text-[18px] md:text-[20px] mb-2">Biography</h2>
                        {bio ? (
                            <>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-line text-[14px] md:text-[16px]">{shownBio}</p>
                                {longBio && (
                                    <button
                                        type="button"
                                        onClick={() => setExpanded(e => !e)}
                                        className="mt-2 text-[#da2f68] hover:underline underline-offset-4"
                                    >
                                        {expanded ? "Show less" : "Read more"}
                                    </button>
                                )}
                            </>
                        ) : (
                            <p className="text-gray-400">We don&apos;t have a biography for {data.name}.</p>
                        )}
                    </section>

                    {knownFor.length > 0 && (
                        <section className="mt-10">
                            <h2 className="text-[20px] md:text-[28px] text-[#D2225C] font-medium mb-5">Known For</h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
                                {knownFor.map(item => (
                                    <Poster key={`${item.media_type}-${item.id}`} posterData={item} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Person
