import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Poster from "../singlePoster/Poster";
import PosterSkeleton from "../PosterSkeleton";

const GRID_CLASS = "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-6 lg:gap-10"

const Loader = () => <p className="text-white text-center py-6">Loading more...</p>

/**
 * Infinitely scrolling poster grid. `dataLength` must be the number of items
 * fetched so far (before any filtering) so the scroller knows when new data arrived.
 */
const PosterGrid = ({ items, dataLength, hasMore, loadMore, isLoading, mediaType }) => {
    if (isLoading) {
        return (
            <div className={GRID_CLASS}>
                {Array.from({ length: 12 }, (_, i) => <PosterSkeleton key={i} />)}
            </div>
        )
    }

    return (
        <InfiniteScroll
            dataLength={dataLength}
            next={loadMore}
            hasMore={hasMore}
            loader={<Loader />}
            style={{ overflow: "visible" }}
        >
            <div className={GRID_CLASS}>
                {items.map(item => (
                    <Poster
                        key={`${item.media_type ?? mediaType}-${item.id}`}
                        posterData={item}
                        media_type={mediaType}
                    />
                ))}
            </div>
        </InfiniteScroll>
    )
}

PosterGrid.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataLength: PropTypes.number.isRequired,
    hasMore: PropTypes.bool.isRequired,
    loadMore: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    mediaType: PropTypes.string,
};

export default PosterGrid
