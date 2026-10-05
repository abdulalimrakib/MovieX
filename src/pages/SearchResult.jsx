import { useParams } from "react-router-dom"
import usePaginatedFetch from "../hooks/usePaginatedFetch"
import useDocumentTitle from "../hooks/useDocumentTitle"
import PosterGrid from "../components/posterGrid/PosterGrid"
import noResults from "../assets/no-results.webp"

function SearchResult() {
    // useParams already decodes the URL-encoded query.
    const { query } = useParams()
    const { results, isLoading, error, hasMore, loadMore } = usePaginatedFetch("/search/multi", { query })
    // People are returned by /search/multi but have no details page here.
    const items = results.filter(item => item.media_type !== "person")

    useDocumentTitle(`Search: ${query}`)

    let content
    if (error) {
        content = <p className="text-gray-400 text-[16px] md:text-[20px]">Something went wrong while searching. Please try again.</p>
    } else if (!isLoading && items.length === 0 && !hasMore) {
        content = (
            <div className="flex flex-col items-center gap-4 py-10">
                <img src={noResults} alt="" className="w-[200px] md:w-[300px]" />
                <p className="text-gray-400 text-[16px] md:text-[20px]">No results found for &lsquo;{query}&rsquo;.</p>
            </div>
        )
    } else {
        content = (
            <PosterGrid
                items={items}
                dataLength={results.length}
                hasMore={hasMore}
                loadMore={loadMore}
                isLoading={isLoading}
            />
        )
    }

    return (
        <div className="min-h-[700px] pt-[80px] md:pt-[100px] pb-[40px] md:pb-[80px] px-2 md:px-5 lg:px-10">
            <h1 className="text-white text-[18px] md:text-[24px] mb-5 lg:mb-10">
                Search results for &lsquo;{query}&rsquo;
            </h1>
            {content}
        </div>
    )
}

export default SearchResult
