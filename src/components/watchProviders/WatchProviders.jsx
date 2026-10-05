import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import { IMAGE_SIZES, getRegion, imageUrl } from "../../utils/media";

const GROUPS = [
    { key: "flatrate", label: "Stream" },
    { key: "free", label: "Free" },
    { key: "ads", label: "With ads" },
    { key: "rent", label: "Rent" },
    { key: "buy", label: "Buy" },
]

/** Streaming/rent/buy options for the viewer's region (TMDB data from JustWatch). */
const WatchProviders = ({ mediaType, id }) => {
    const { data } = useFetch(`/${mediaType}/${id}/watch/providers`)
    const region = getRegion()
    const providers = data?.results?.[region]
    const groups = GROUPS.filter(g => providers?.[g.key]?.length)

    if (groups.length === 0) return null

    return (
        <section className="py-4 md:py-5 border-b-[0.5px] border-gray-500">
            <h2 className="text-[16px] md:text-[18px] mb-3">Where to watch <span className="text-gray-500 text-[13px]">({region})</span></h2>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
                {groups.map(group => (
                    <div key={group.key}>
                        <p className="text-[12px] uppercase tracking-wide text-gray-400 mb-2">{group.label}</p>
                        <ul className="flex flex-wrap gap-2">
                            {providers[group.key].map(p => (
                                <li key={p.provider_id}>
                                    <a href={providers.link} target="_blank" rel="noreferrer" title={p.provider_name}>
                                        <img
                                            src={imageUrl(p.logo_path, IMAGE_SIZES.logo)}
                                            alt={p.provider_name}
                                            loading="lazy"
                                            className="w-10 h-10 md:w-11 md:h-11 rounded-lg ring-1 ring-white/10 hover:ring-[#da2f68] transition"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <p className="mt-3 text-[11px] text-gray-500">
                Availability data provided by{" "}
                <a href="https://www.justwatch.com/" target="_blank" rel="noreferrer" className="underline hover:text-[#da2f68]">JustWatch</a>.
            </p>
        </section>
    )
}

WatchProviders.propTypes = {
    mediaType: PropTypes.oneOf(["movie", "tv"]).isRequired,
    id: PropTypes.string.isRequired,
};

export default WatchProviders
