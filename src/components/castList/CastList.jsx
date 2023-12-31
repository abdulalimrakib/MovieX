/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
// import "./cast.scss"
import Img from "../Img";
import avatar from "../../assets/avatar.png"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CastList = ({ casts, isLoading }) => {
    const { url } = useSelector(state => state.home)

    const length = casts?.length


    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: length > 7 ? 8 : length,
        slidesToScroll: 5,
        responsive: [
            {
              breakpoint: 768,
                settings: {
                  slidesToShow: length > 7 ? 8 : length,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: false,
                  arrows: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 2,
                initialSlide: 2,
                arrows: false
              }
            },   
          ]
    };


    return (
        <div className="px-[10px] xl:px-[100px] mb-10">
            <Slider {...settings}>
                {!isLoading ?
                    (casts?.map(item => (<div key={item.id} className="flex flex-col">
                        <div className="w-[50px] lg:w-[100px] h-[50px] lg:h-[100px] rounded-full overflow-hidden flex justify-center items-center">
                            <Img src={item?.profile_path ? (url.profile + item.profile_path) : (avatar)} />
                        </div>
                        <div className="text-white text-center py-2">
                            <h2 className="truncate text-[12px] md:tex-[16px]">{item.name}</h2>
                            <h4 className="text-[10px] md:tex-[14px] italic text-gray-500 my-1 truncate">{item.character}</h4>
                        </div>
                    </div>))) : <p>Loading ...</p>
                }
            </Slider>
        </div>
    )
}

export default CastList