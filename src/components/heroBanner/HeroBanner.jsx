import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa6"
import useFetch from '../../hooks/useFetch';
import Img from "../Img";
import SearchForm from "../searchForm/SearchForm";
import { IMAGE_SIZES, formatDate, getReleaseDate, getTitle, imageUrl } from "../../utils/media";


function HeroBanner() {
    const { data } = useFetch("/trending/movie/week")
    // Random number picked once per visit, so the featured title stays stable across re-renders.
    const [seed] = useState(Math.random)

    // Feature one random trending movie that has a backdrop.
    const featured = useMemo(() => {
        const withBackdrop = data?.results?.filter(item => item.backdrop_path) ?? []
        return withBackdrop.length ? withBackdrop[Math.floor(seed * withBackdrop.length)] : null
    }, [data, seed])

    const year = formatDate(getReleaseDate(featured), "YYYY")

    return (
        <div className="relative w-full h-[340px] sm:h-[450px] md:h-[700px] flex justify-center items-center">
            <div className="absolute w-full h-full opacity-70 overflow-hidden" aria-hidden="true">
                {featured && <Img src={imageUrl(featured.backdrop_path, IMAGE_SIZES.backdrop)} />}
            </div>

            <div className="opacity-layer" />

            <div className="relative z-10 text-center flex flex-col w-full max-w-[1000px]">
                <h1 className="text-white md:text-[90px] text-[30px] font-bold mb-[7px] md:mb-[10px]">Welcome.</h1>
                <p className="text-white md:text-[24px] text-[14px] font-medium mb-[20px] md:mb-[40px] px-4">Millions of movies, TV shows and people to discover. Explore now.</p>

                <SearchForm
                    className="w-full px-5 md:px-0"
                    inputClassName="h-[30px] md:h-[50px] indent-2 md:indent-4 text-[14px] md:text-[18px]"
                    buttonClassName="w-[20%] text-[14px] md:text-[18px] font-medium text-white bg-linear-to-r from-[#FD8E28] to-[#CD1563] h-[30px] md:h-[50px]"
                    buttonLabel="Search"
                />
            </div>

            {/* Credit for the backdrop, doubling as a shortcut to that title. */}
            {featured && (
                <Link
                    to={`/movie/${featured.id}`}
                    className="absolute bottom-3 md:bottom-10 left-3 md:left-10 max-w-[80%] flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-black/50 backdrop-blur-sm ring-1 ring-white/15 text-white text-[11px] md:text-[14px] hover:bg-[#da2f68]/80 transition-colors"
                >
                    <span className="uppercase tracking-wider text-[#f89e00] font-bold">Featured</span>
                    <span className="truncate">{getTitle(featured)}{year && ` (${year})`}</span>
                    {featured.vote_average > 0 && (
                        <span className="flex items-center gap-1 shrink-0 text-gray-200"><FaStar className="text-[#f89e00]" /> {featured.vote_average.toFixed(1)}</span>
                    )}
                </Link>
            )}
        </div>
    )
}

export default HeroBanner
