/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import Img from './../Img';
import "./poster.scss"
import fallBackImg from "../../assets/no-poster.png"
import dayjs from "dayjs";
import Reating from "../reating/Reating.jSX";
import { useNavigate } from "react-router-dom";

const Poster = ({ posterData, mediaType, key }) => {
    // console.log(posterData);
    const navigate = useNavigate()
    const { url } = useSelector(state => state.home)

    const goDetails = (key) => {
        navigate(`/${mediaType}/${key}`)
    }

    const imgUrl = posterData.backdrop_path ? url.poster + posterData.backdrop_path : fallBackImg
    return (
        <div className="flex-shrink-0 w-full hover:cursor-pointer" onClick={() => goDetails(posterData.id)}>
            <div className="w-full aspect-[1/1.5] bg-cover bg-center">
                <Img src={imgUrl}></Img>
                <Reating value={posterData.vote_average.toFixed(1)} />
            </div>
            <div>
                <span className="text-white px-1 flex justify-start items-center py-2 mt-3 truncate">{posterData.title || posterData.name}</span>
                <span className="px-1 flex justify-start items-center py-2 text-gray-500">{dayjs(posterData.release_date).format('MMM D, YYYY')}</span>
            </div>
        </div>
    )
}

export default Poster