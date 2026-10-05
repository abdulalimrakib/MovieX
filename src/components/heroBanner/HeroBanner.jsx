import { useMemo, useState } from "react"
import useFetch from '../../hooks/useFetch';
import Img from "../Img";
import SearchForm from "../searchForm/SearchForm";
import { IMAGE_SIZES, imageUrl } from "../../utils/media";


function HeroBanner() {
    const { data } = useFetch("/movie/upcoming")
    // Random number picked once per visit, so the backdrop stays stable across re-renders.
    const [seed] = useState(Math.random)

    // Pick one random backdrop per response, only among results that have one.
    const backGround = useMemo(() => {
        const withBackdrop = data?.results?.filter(item => item.backdrop_path) ?? []
        if (withBackdrop.length === 0) return null
        const item = withBackdrop[Math.floor(seed * withBackdrop.length)]
        return imageUrl(item.backdrop_path, IMAGE_SIZES.backdrop)
    }, [data, seed])

    return (
        <div className="relative w-full h-[300px] sm:h-[450px] md:h-[700px] flex justify-center items-center">
            <div className="absolute w-full h-full opacity-70 overflow-hidden" aria-hidden="true">
                {backGround && <Img src={backGround} />}
            </div>

            <div className="opacity-layer" />

            <div className="relative text-center flex flex-col w-full max-w-[1000px]">
                <h1 className="text-white md:text-[90px] text-[30px] font-bold mb-[7px] md:mb-[10px]">Welcome.</h1>
                <p className="text-white md:text-[24px] text-[14px] font-medium mb-[20px] md:mb-[40px] px-4">Millions of movies, TV shows and people to discover. Explore now.</p>

                <SearchForm
                    className="w-full px-5 md:px-0"
                    inputClassName="h-[30px] md:h-[50px] indent-2 md:indent-4 text-[14px] md:text-[18px]"
                    buttonClassName="w-[20%] text-[14px] md:text-[18px] font-medium text-white bg-linear-to-r from-[#FD8E28] to-[#CD1563] h-[30px] md:h-[50px]"
                    buttonLabel="Search"
                />
            </div>
        </div>
    )
}

export default HeroBanner
