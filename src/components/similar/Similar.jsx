import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Poster from "../singlePoster/Poster";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

const Similar = () => {
    const [title, setTitle] = useState(null)
    const { mediaType, id } = useParams()
    const { isLoading, data } = useFetch(`/${mediaType}/${id}/similar`)
    console.log(data);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 4
    };

    useEffect(() => {
        mediaType === "tv" ? setTitle("Similar TV Shows") : setTitle("Similar Movies")
    }, [mediaType])

    return (
        <>
            <div className="flex justify-between px-10 ">
                <div>
                    {data?.results?.length > 0 && <span className="text-3xl text-[#D2225C] font-medium">{title}</span>}
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

export default Similar