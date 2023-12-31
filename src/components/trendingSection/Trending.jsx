import { useState } from "react"
import Switch from "../switchingTab/Switch"
import useFetch from "../../hooks/useFetch"
import Poster from "../singlePoster/Poster"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from '@mui/material/Skeleton';
import NextArrow from './../arrowOfSlider/NextArrow';
import PrevArrow from './../arrowOfSlider/PrevArrow';



const Trending = () => {
    const [trendingData, setTrendingData] = useState("day")
    const { isLoading, data } = useFetch(`/trending/all/${trendingData}`)
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
                infinite: true,
                dots: false,
                arrows: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                initialSlide: 2,
                arrows: false
              }
            },   
          ]
    };


    const timeOfTrendingData = (time) => {
        setTrendingData(time.toLowerCase())
    }

    return (
        <>
            <div className="flex justify-between px-1 md:px-10">
                <div>
                    <span className="text-xl md:text-3xl text-[#D2225C] font-bold md:font-medium">Trending</span>
                </div>
                <div>
                    <Switch tabs={["Day", "Week"]} getTabMethod={timeOfTrendingData} />
                </div>
            </div>
            <div className="px-2 md:px-5 my-3 md:my-10 mb-[40px] md:mb-[70px]">
                <Slider {...settings}>
                    {
                        !isLoading ? (data?.results?.map(data => <Poster key={data.id} posterData={data} />)) : <p>
                            <Skeleton className="" variant="rounded" animation="wave" width={210} height={60} />
                        </p>
                    }
                </Slider>

            </div>
        </>
    )
}

export default Trending