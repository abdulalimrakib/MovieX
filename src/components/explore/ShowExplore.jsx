/* eslint-disable no-unsafe-optional-chaining */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import "./style.scss";

import useFetch from "../../hooks/useFetch";
import { fetchApi } from "../../utils/api";
import Poster from "../singlePoster/Poster";

let filters = {};

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const ShowExplore = () => {
    const [datas, setDatas] = useState(null);
    const [pageNo, setPageNo] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const { mediaType } = useParams();

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    const fetchInitialData = () => {
        setLoading(true);
        fetchApi(`/discover/${mediaType}`, filters).then((res) => {
            setDatas(res);
            setPageNo((prev) => prev + 1);
            setLoading(false);
        });
    };

    const dataNextFetching = () => {
        fetchApi(
            `/discover/${mediaType}?page=${pageNo}`,
            filters
        ).then((res) => {
            if (datas?.results) {
                setDatas({
                    ...datas,
                    results: [...datas?.results, ...res.results],
                });
            } else {
                setDatas(res);
            }
            setPageNo((prev) => prev + 1);
        });
    };

    useEffect(() => {
        filters = {};
        setDatas(null);
        setPageNo(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);

    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        setPageNo(1);
        fetchInitialData();
    };

    return (
        <div className="explorePage py-[40px] md:py-[80px] px-2 md:px-5 lg:px-10">
            <div>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {!loading && (
                    <>
                        {datas?.results?.length > 0 ? (
                            <div className="py-5 lg:my-10">
                            <InfiniteScroll
                                dataLength={datas?.results?.length || []}
                                className="content"
                                next={dataNextFetching}
                                hasMore={pageNo <= datas?.total_pages}
                            >
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-6 lg:gap-10">
                                    {
                                        datas?.results?.map((item, index) => {
                                            if (item.media_type === "person")
                                                return
                                            return <Poster key={index} posterData={item} media_type={mediaType} />
                                        })
                                    }
                                </div>
                            </InfiniteScroll>
                        </div>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ShowExplore;
