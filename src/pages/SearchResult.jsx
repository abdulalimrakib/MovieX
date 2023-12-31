import { useEffect, useState } from "react"
import { fetchApi } from "../utils/api"
import { useParams } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
import Poster from "../components/singlePoster/Poster"

function SearchResult() {
    const [datas, setDatas] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const { query } = useParams()
    const [pageNo, setPageNo] = useState(1)

    const dataFetching = () => {
        fetchApi(`/search/multi?query=${query}&page=${pageNo}`)
            .then(res => {
                setDatas(res)
                setIsLoading(false)
                setPageNo(prev => prev + 1)
            })
    }
    const dataNextFetching = () => {
        fetchApi(`/search/multi?query=${query}&page=${pageNo}`)
            .then(res => {
                if (datas?.results) {
                    setDatas(prevData => ({
                        ...prevData,
                        results: [...prevData.results, ...res.results]
                    }));
                } else {
                    setDatas(res);
                }
                setPageNo(prev => prev + 1)
            })
    }

    useEffect(() => {
        dataFetching()
    }, [query])

    return (
        <div className="py-[40px] md:py-[80px] px-2 md:px-5 lg:px-10">
            {
                !isLoading ?
                    <>
                        <div className="text-white text-[14px] md:text-[24px]">
                            {
                                `Search ${datas?.results?.length > 1 ? "results" : "result"} of '${query}'`
                            }
                        </div>
                        <div className="my-5 lg:my-10">
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
                                            return <Poster key={index} posterData={item} media_type={item.media_type} />
                                        })
                                    }
                                </div>
                            </InfiniteScroll>
                        </div>
                    </>
                    :
                    <div className="flex justify-center">
                        <h2 className="text-white text-[24px]">Loading ...</h2>
                    </div>
            }
        </div>
    )
}

export default SearchResult