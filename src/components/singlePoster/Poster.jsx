import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Img from '../Img';
import Rating from "../rating/Rating";
import WatchlistButton from "../watchlistButton/WatchlistButton";
import fallBackImg from "../../assets/no-poster.webp"
import { IMAGE_SIZES, formatDate, getReleaseDate, getTitle, imageUrl, isValidMediaType } from "../../utils/media";

const Poster = ({ posterData, media_type }) => {
    const mediaType = media_type || posterData.media_type
    const title = getTitle(posterData)
    const imgUrl = imageUrl(posterData.poster_path, IMAGE_SIZES.poster, fallBackImg)

    // The watchlist button sits beside the link (not inside it): a button
    // nested in a link is invalid HTML and confuses screen readers.
    return (
        <div className="relative group shrink-0 w-full">
            <Link to={`/${mediaType}/${posterData.id}`} className="block">
                <div className="relative w-full aspect-[1/1.5] group-hover:opacity-80 group-hover:scale-105 duration-300">
                    <Img src={imgUrl} alt={title} className="rounded-[20px]" />
                    <div className="absolute bottom-0 translate-y-1/2 left-1 w-[28px] md:w-[40px] rounded-full">
                        <Rating value={posterData.vote_average} />
                    </div>
                </div>
                <div>
                    <span className="text-white px-1 block py-1 md:py-2 mt-4 md:mt-6 truncate text-[14px] md:text-[16px]">{title}</span>
                    <span className="px-1 block py-1 md:py-2 text-gray-500 text-[10px] md:text-[16px]">{formatDate(getReleaseDate(posterData))}</span>
                </div>
            </Link>
            {isValidMediaType(mediaType) && (
                <WatchlistButton item={posterData} mediaType={mediaType} className="absolute top-2 right-2" />
            )}
        </div>
    )
}

Poster.propTypes = {
    posterData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        media_type: PropTypes.string,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
    }).isRequired,
    media_type: PropTypes.string,
};

export default Poster
