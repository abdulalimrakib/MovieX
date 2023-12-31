/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import Img from './../Img';
import "./poster.scss"
import fallBackImg from "../../assets/no-poster.png"
import dayjs from "dayjs";
import Reating from "../reating/Reating.jSX";
import { useNavigate } from "react-router-dom";

const Poster = ({ posterData, media_type }) => {
    // console.log(posterData);
    const navigate = useNavigate()
    const { url } = useSelector(state => state.home)

    const goDetails = (key) => {
        navigate(`/${media_type || posterData.media_type}/${key}`)
    }

    const imgUrl = posterData.backdrop_path ? url.poster + posterData.backdrop_path : fallBackImg
    return (
        <div className="flex-shrink-0 w-full hover:cursor-pointer" onClick={() => goDetails(posterData.id)}>
            <div className="w-full aspect-[1/1.5] bg-cover bg-center hover:opacity-80 hover:scale-105 duration-300">
                <Img src={imgUrl}></Img>
                <div className="absolute w-[20px] md:w-[40px] bg-white -mt-[20px] md:-mt-[45px] md:ml-1 rounded-full">
                    <Reating value={posterData?.vote_average?.toFixed(1)} />
                </div>
            </div>
            <div>
                <span className="text-white px-1 flex justify-start items-center py-1 md:py-2 mt-2 md:mt-3 truncate text-[14px] md:text-[16px]">{posterData.title || posterData.name}</span>
                <span className="px-1 flex justify-start items-center py-1 md:py-2 text-gray-500 text-[10px] md:text-[16px]">{dayjs(posterData.release_date).format('MMM D, YYYY')}</span>
            </div>
        </div>
    )
}

export default Poster