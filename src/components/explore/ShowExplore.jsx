import PropTypes from "prop-types";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";

import "./style.css";

import useFetch from "../../hooks/useFetch";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import PosterGrid from "../posterGrid/PosterGrid";

// Movies and TV shows use different field names for date and title sorting.
const SORT_OPTIONS = {
    movie: [
        { value: "popularity.desc", label: "Popularity Descending" },
        { value: "popularity.asc", label: "Popularity Ascending" },
        { value: "vote_average.desc", label: "Rating Descending" },
        { value: "vote_average.asc", label: "Rating Ascending" },
        { value: "primary_release_date.desc", label: "Release Date Descending" },
        { value: "primary_release_date.asc", label: "Release Date Ascending" },
        { value: "original_title.asc", label: "Title (A-Z)" },
    ],
    tv: [
        { value: "popularity.desc", label: "Popularity Descending" },
        { value: "popularity.asc", label: "Popularity Ascending" },
        { value: "vote_average.desc", label: "Rating Descending" },
        { value: "vote_average.asc", label: "Rating Ascending" },
        { value: "first_air_date.desc", label: "First Air Date Descending" },
        { value: "first_air_date.asc", label: "First Air Date Ascending" },
        { value: "original_name.asc", label: "Title (A-Z)" },
    ],
};

/**
 * Discover page for one media type. The genre and sort filters live in the
 * URL (?genres=28,12&sort=vote_average.desc) so a filtered view can be shared,
 * bookmarked and restored with the Back button.
 */
const ShowExplore = ({ mediaType }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    const genreIds = useMemo(
        () => (searchParams.get("genres") ?? "").split(",").map(Number).filter(Boolean),
        [searchParams]
    );
    const sortOptions = SORT_OPTIONS[mediaType];
    const sortBy = sortOptions.find(o => o.value === searchParams.get("sort")) ?? null;
    const genres = (genresData?.genres ?? []).filter(g => genreIds.includes(g.id));

    const updateParam = (key, value) => {
        const next = new URLSearchParams(searchParams);
        if (value) next.set(key, value);
        else next.delete(key);
        // replace: changing a filter shouldn't add a history entry per click.
        setSearchParams(next, { replace: true });
    };

    const params = useMemo(() => {
        const p = {};
        if (sortBy) p.sort_by = sortBy.value;
        // Comma-separated ids mean "has all of these genres".
        if (genreIds.length > 0) p.with_genres = genreIds.join(",");
        return p;
    }, [genreIds, sortBy]);

    const { results, isLoading, error, hasMore, loadMore } = usePaginatedFetch(`/discover/${mediaType}`, params);

    let content;
    if (error) {
        content = <span className="resultNotFound">Something went wrong. Please try again.</span>;
    } else if (!isLoading && results.length === 0) {
        content = <span className="resultNotFound">Sorry, results not found!</span>;
    } else {
        content = (
            <PosterGrid
                items={results}
                dataLength={results.length}
                hasMore={hasMore}
                loadMore={loadMore}
                isLoading={isLoading}
                mediaType={mediaType}
            />
        );
    }

    return (
        <div className="explorePage pb-[40px] md:pb-[80px] px-2 md:px-5 lg:px-10">
            <div className="pageHeader">
                <h1 className="pageTitle">
                    {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
                </h1>
                <div className="filters">
                    <Select
                        isMulti
                        name="genres"
                        aria-label="Filter by genre"
                        value={genres}
                        closeMenuOnSelect={false}
                        options={genresData?.genres ?? []}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        onChange={(selected) => updateParam("genres", (selected ?? []).map(g => g.id).join(","))}
                        placeholder="Select genres"
                        className="react-select-container genresDD"
                        classNamePrefix="react-select"
                    />
                    <Select
                        name="sortby"
                        aria-label="Sort by"
                        value={sortBy}
                        options={sortOptions}
                        onChange={(option) => updateParam("sort", option?.value)}
                        isClearable
                        placeholder="Sort by"
                        className="react-select-container sortbyDD"
                        classNamePrefix="react-select"
                    />
                </div>
            </div>
            <div className="py-5">{content}</div>
        </div>
    );
};

ShowExplore.propTypes = {
    mediaType: PropTypes.oneOf(["movie", "tv"]).isRequired,
};

export default ShowExplore;
