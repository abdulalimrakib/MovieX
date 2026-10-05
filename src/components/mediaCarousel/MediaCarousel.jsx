import PropTypes from "prop-types";
import { useState } from "react";
import Slider from "../Slider";
import useFetch from "../../hooks/useFetch";
import Poster from "../singlePoster/Poster";
import PosterSkeleton from "../PosterSkeleton";
import Switch from "../switchingTab/Switch";
import NextArrow from "../arrowOfSlider/NextArrow";
import PrevArrow from "../arrowOfSlider/PrevArrow";

// Slides visible per breakpoint: [default, below first breakpoint, below 600px].
const LAYOUTS = {
    home: { breakpoint: 768, slides: [5, 4, 3] },
    details: { breakpoint: 1024, slides: [7, 5, 4] },
}

const sliderSettings = (layout, count) => {
    const [base, mid, small] = LAYOUTS[layout].slides
    // Infinite mode clones slides, which duplicates posters when the list is
    // shorter than the visible window, so only enable it when it can loop.
    return {
        dots: false,
        speed: 500,
        infinite: count > base,
        slidesToShow: base,
        slidesToScroll: base - 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: LAYOUTS[layout].breakpoint,
                settings: { slidesToShow: mid, slidesToScroll: mid - 1, infinite: count > mid, arrows: false },
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: small, slidesToScroll: small - 1, infinite: count > small, arrows: false },
            },
        ],
    }
}

/**
 * A titled poster slider. With `tabs`, the selected tab's value is passed to
 * `endpoint` and (if the tab has a `mediaType`) decides where posters link to.
 */
const MediaCarousel = ({ title, endpoint, tabs, mediaType, layout = "home", hideWhenEmpty = false }) => {
    const [activeTab, setActiveTab] = useState(tabs?.[0])
    const { isLoading, data, error } = useFetch(endpoint(activeTab?.value))
    const results = data?.results ?? []
    const posterMediaType = activeTab?.mediaType ?? mediaType
    const skeletonCount = LAYOUTS[layout].slides[0]

    if (hideWhenEmpty && !isLoading && results.length === 0) return null

    return (
        <section>
            <div className="flex justify-between items-center px-2 md:px-10">
                <h2 className="text-xl md:text-3xl text-[#D2225C] font-bold md:font-medium">{title}</h2>
                {tabs && <Switch tabs={tabs} onChange={setActiveTab} />}
            </div>
            <div className="px-2 md:px-5 my-3 md:my-10 mb-[40px] md:mb-[70px]">
                {error ? (
                    <p className="text-gray-400 px-2 md:px-5">Couldn&apos;t load {title.toLowerCase()}. Please try again later.</p>
                ) : isLoading ? (
                    <Slider {...sliderSettings(layout, skeletonCount)} arrows={false}>
                        {Array.from({ length: skeletonCount }, (_, i) => <PosterSkeleton key={i} />)}
                    </Slider>
                ) : (
                    <Slider {...sliderSettings(layout, results.length)}>
                        {results.map(item => (
                            <Poster key={item.id} posterData={item} media_type={posterMediaType} />
                        ))}
                    </Slider>
                )}
            </div>
        </section>
    )
}

MediaCarousel.propTypes = {
    title: PropTypes.string.isRequired,
    endpoint: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        mediaType: PropTypes.string,
    })),
    mediaType: PropTypes.string,
    layout: PropTypes.oneOf(Object.keys(LAYOUTS)),
    hideWhenEmpty: PropTypes.bool,
};

export default MediaCarousel
