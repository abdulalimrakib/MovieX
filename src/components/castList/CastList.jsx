import PropTypes from "prop-types";
import Slider from "../Slider";
import Img from "../Img";
import avatar from "../../assets/avatar.webp"
import { IMAGE_SIZES, imageUrl } from "../../utils/media";

const settingsFor = (count) => ({
    dots: false,
    speed: 500,
    arrows: false,
    infinite: count > 8,
    slidesToShow: 8,
    slidesToScroll: 5,
    responsive: [
        { breakpoint: 768, settings: { slidesToShow: 6, slidesToScroll: 3, infinite: count > 6 } },
        { breakpoint: 600, settings: { slidesToShow: 4, slidesToScroll: 2, infinite: count > 4 } },
    ],
})

const CastList = ({ casts }) => {
    if (!casts?.length) return null

    return (
        <section>
            <h2 className="mb-3 text-[16px] md:text-[24px] text-[#C12E5B] font-medium px-3 lg:px-10">Top Casts</h2>
            <div className="px-[10px] xl:px-[100px] mb-10">
                <Slider {...settingsFor(casts.length)}>
                    {casts.map(item => (
                        <div key={item.credit_id ?? item.id} className="flex flex-col items-center">
                            <div className="w-[50px] lg:w-[100px] h-[50px] lg:h-[100px] mx-auto rounded-full overflow-hidden">
                                <Img src={imageUrl(item.profile_path, IMAGE_SIZES.profile, avatar)} alt={item.name} />
                            </div>
                            <div className="text-white text-center py-2">
                                <p className="truncate text-[12px] md:text-[16px]">{item.name}</p>
                                <p className="text-[10px] md:text-[14px] italic text-gray-500 my-1 truncate">{item.character}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}

CastList.propTypes = {
    casts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        credit_id: PropTypes.string,
        name: PropTypes.string,
        character: PropTypes.string,
        profile_path: PropTypes.string,
    })),
};

export default CastList
