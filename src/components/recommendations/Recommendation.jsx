import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Poster from "../singlePoster/Poster";
import { Skeleton } from "@mui/material";

const Recommendation = () => {
    const { mediaType, id } = useParams()
    const { isLoading, data } = useFetch(`/${mediaType}/${id}/recommendations`)
    console.log(mediaType);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 4
    };


    return (
        <>
            <div className="flex justify-between px-10 ">
                <div>
                    {data?.results?.length > 0 && <span className="text-3xl text-[#D2225C] font-medium">Recommendations</span>}
                </div>
            </div>

            <Slider {...settings} className="px-10 my-16">
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