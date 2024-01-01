import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Poster from "../singlePoster/Poster";
import { Skeleton } from "@mui/material";
import NextArrow from "../arrowOfSlider/NextArrow";
import PrevArrow from "../arrowOfSlider/PrevArrow";

const Recommendation = () => {
    const { mediaType, id } = useParams()
    const { isLoading, data } = useFetch(`/${mediaType}/${id}/recommendations`)
    const length = data?.results?.length

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: length > 7 ? 7 : length,
        slidesToScroll: 4,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: length > 5 ? 5 : length,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: length > 4 ? 4 : length,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    arrows: false
                }
            },
        ]
    };


    return (
        <>
            <div className="px-2 lg:px-10">
                <div>
                    {data?.results?.length > 0 && <span className="text-lg md:text-3xl text-[#D2225C] font-medium">Recommendations</span>}
                </div>
            </div>

            <Slider {...settings} className="px-2 lg:px-10 my-5 lg:my-16">
                {
                    !isLoading ? (data?.results?.map(data => <Poster key={data.id} posterData={data} media_type={mediaType} />)) : <p>
                        <Skeleton className="" variant="rounded" animation="wave" width={210} height={60} />
                    </p>
                }
            </Slider>
        </>
    )
}

export default Recommendation