import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useFetch from './../../hooks/useFetch';
import { useSelector } from "react-redux";
import "./heroBanner.scss"
import Img from "../Img";


function HeroBanner() {
    const [backGround, setBackGround] = useState("")
    const [searchData, setSearchData] = useState("")
    const navigate = useNavigate()
    const { data, isLoading } = useFetch("/movie/upcoming")
    const { url } = useSelector(state => state.home)

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
        setBackGround(bg)
    }, [data, url])

    const keyHandle = (e) => {
        if (e.key === "Enter" && searchData.length > 0) {
            navigate(`/search/${searchData}`)
        }
    }

    return (
        <>
            <div className="relative w-full h-[300px] md:h-[700px] sm:h-[450px] flex justify-center items-center">
                <div className="absolute w-full h-full opacity-70 overflow-hidden">
                    {!isLoading && <Img className="" src={backGround} alt="" />}
                </div>

                <div className="opacity-layer">
                    {/* for opacity */}
                </div>


                <div className="relative text-center flex flex-col">
                    <span className="text-white md:text-[90px] text-[30px] font-bold mb-[7px] md:mb-[10px]">Wellcome.</span>
                    <span className="text-white md:text-[24px] text-[14px] font-medium mb-[20px] md:mb-[40px]">Millions of movies, Tv shows and people to deserve. Explore now</span>

                    <div className="flex justify-center items-center w-full px-5 md:px-0">
                        <input type="text" className="w-[80%] rounded-s-full h-[30px] md:h-[50px] indent-2 md:indent-4 text-[14px] md:text-[18px] truncate" name="search" placeholder="search fro a move or tv show..."
                            onChange={e => { setSearchData(e.target.value) }}
                            onKeyUp={keyHandle}
                        />
                        <button
                            className="w-[20%] text-[14px] md:text-[18px] font-medium bg-gradient-to-r from-[#FD8E28] to-[#CD1563] h-[30px] md:h-[50px] rounded-e-full"
                            onClick={() => {
                                searchData.length > 0 &&
                                    navigate(`/search/${searchData}`)
                            }}
                        >search</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroBanner