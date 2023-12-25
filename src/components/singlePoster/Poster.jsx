/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import Img from './../Img';
import "./poster.scss"
import fallBackImg from "../../assets/no-poster.png"
import dayjs from "dayjs";

const Poster = ({ posterData }) => {
    const { url } = useSelector(state => state.home)

    const imgUrl = posterData.backdrop_path ? url.poster + posterData.backdrop_path : fallBackImg
    console.log(imgUrl);
    return (
        <div className="flex-shrink-0 w-full hover:cursor-pointer">
            <div className="w-full aspect-[1/1.5] bg-cover bg-center relative">
                <Img src={imgUrl}></Img>
            </div>
            <div>
                <span className="text-white px-1 flex justify-start items-center py-2 mt-3">{posterData.title || posterData.name}</span>
                <span className="text-white px-1 flex justify-start items-center py-2 text-gray-600">{dayjs(posterData.release_date).format('MMM D, YYYY')}</span>
            </div>
        </div>
    )
}

export default Poster