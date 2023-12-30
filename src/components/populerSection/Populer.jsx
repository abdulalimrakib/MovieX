/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import Switch from "../switchingTab/Switch"
import useFetch from "../../hooks/useFetch"
import Poster from "../singlePoster/Poster"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from '@mui/material/Skeleton';


const Populer = () => {
    const [populerData, setPopulerData] = useState("movie")
    const { isLoading, data } = useFetch(`/${populerData}/popular`)
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3
    };

    const typeOfPopulerData = (type) => {
        if (type) {
            type === "Movies" ? setPopulerData("movie") : setPopulerData("tv")
        }
    }

    return (
        <>
            <div className="flex justify-between px-1 md:px-10">
                <div>
                    <span className="text-xl md:text-3xl text-[#D2225C] font-bold md:font-medium">What's Populer</span>
                </div>
                <div>
                    <Switch tabs={["Movies", "Tv Shows"]} getTabMethod={typeOfPopulerData} />
                </div>
            </div>
            <div className="px-2 md:px-5 my-3 md:my-10 mb-[40px] md:mb-[70px]">
                <Slider {...settings}>
                    {
                        !isLoading ? (data?.results?.map(data => <Poster key={data.id} media_type={populerData} posterData={data} />)) : <p>
                            <Skeleton className="" variant="rounded" animation="wave" width={210} height={60} />
                        </p>
                    }
                </Slider>

            </div>
        </>
    )
}

export default Populer