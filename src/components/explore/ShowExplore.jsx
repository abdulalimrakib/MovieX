import PropTypes from "prop-types";
import { useMemo, useState } from "react";
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

/** Discover page for one media type. Render with `key={mediaType}` so filters reset on switch. */
const ShowExplore = ({ mediaType }) => {
    const [genres, setGenres] = useState([]);
    const [sortBy, setSortBy] = useState(null);

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    const params = useMemo(() => {
        const p = {};
        if (sortBy) p.sort_by = sortBy.value;
        // Comma-separated ids mean "has all of these genres".
        if (genres.length > 0) p.with_genres = genres.map(g => g.id).join(",");
        return p;
    }, [genres, sortBy]);

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
                        onChange={(selected) => setGenres(selected ?? [])}
                        placeholder="Select genres"
                        className="react-select-container genresDD"
                        classNamePrefix="react-select"
                    />
                    <Select
                        name="sortby"
                        aria-label="Sort by"
                        value={sortBy}
                        options={SORT_OPTIONS[mediaType]}
                        onChange={setSortBy}
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
