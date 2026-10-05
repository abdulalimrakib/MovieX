import PropTypes from "prop-types";
import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import useSearchSuggestions from "../../hooks/useSearchSuggestions";
import noPoster from "../../assets/no-poster.webp";
import { IMAGE_SIZES, formatDate, getReleaseDate, getTitle, imageUrl } from "../../utils/media";

/**
 * Search box shared by the hero banner and the header. While typing it shows
 * live suggestions (arrow keys + Enter to pick one); submitting goes to the
 * full, URL-encoded search page. `onSearch` lets the caller close itself.
 */
const SearchForm = ({ className = "", inputClassName = "", buttonClassName = "", buttonLabel = <HiOutlineSearch />, autoFocus = false, onSearch }) => {
    const [query, setQuery] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const navigate = useNavigate()
    const listId = useId()
    const { items, isLoading } = useSearchSuggestions(query)

    const showList = isOpen && query.trim().length >= 2 && (isLoading || items.length > 0)

    const finish = (path) => {
        navigate(path)
        setQuery("")
        setIsOpen(false)
        setActiveIndex(-1)
        onSearch?.()
    }

    const openItem = (item) => finish(`/${item.media_type}/${item.id}`)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (showList && activeIndex >= 0 && items[activeIndex]) return openItem(items[activeIndex])
        const trimmed = query.trim()
        if (trimmed) finish(`/search/${encodeURIComponent(trimmed)}`)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setIsOpen(false)
            setActiveIndex(-1)
            return
        }
        if (!items.length || (e.key !== "ArrowDown" && e.key !== "ArrowUp")) return
        e.preventDefault()
        setIsOpen(true)
        // Cycle input (-1) -> first ... last -> input.
        const step = e.key === "ArrowDown" ? 1 : -1
        setActiveIndex(i => {
            const next = i + step
            if (next >= items.length) return -1
            if (next < -1) return items.length - 1
            return next
        })
    }

    return (
        <form role="search" onSubmit={handleSubmit} className={`flex justify-center items-center ${className}`}>
            <div className="relative w-[80%]">
                <input
                    type="search"
                    name="search"
                    role="combobox"
                    aria-label="Search for a movie or TV show"
                    aria-expanded={showList}
                    aria-controls={listId}
                    aria-autocomplete="list"
                    aria-activedescendant={showList && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
                    autoComplete="off"
                    placeholder="Search for a movie or TV show..."
                    autoFocus={autoFocus}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setIsOpen(true)
                        setActiveIndex(-1)
                    }}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setIsOpen(false)}
                    onKeyDown={handleKeyDown}
                    className={`w-full rounded-s-full truncate bg-white text-black ${inputClassName}`}
                />
                {showList && (
                    <ul
                        id={listId}
                        role="listbox"
                        aria-label="Search suggestions"
                        // Keep focus in the input so onBlur doesn't close the list before a click lands.
                        onMouseDown={(e) => e.preventDefault()}
                        className="absolute left-0 right-0 top-full mt-2 z-50 text-left overflow-hidden rounded-2xl bg-[#041226] ring-1 ring-[#173d77] shadow-2xl"
                    >
                        {items.length === 0 ? (
                            <li className="px-4 py-3 text-[14px] text-gray-400">Searching…</li>
                        ) : items.map((item, index) => (
                            <li
                                key={`${item.media_type}-${item.id}`}
                                id={`${listId}-${index}`}
                                role="option"
                                aria-selected={index === activeIndex}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => openItem(item)}
                                className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${index === activeIndex ? "bg-[#173d77]" : ""}`}
                            >
                                <img
                                    src={imageUrl(item.poster_path, IMAGE_SIZES.logo, noPoster)}
                                    alt=""
                                    className="w-[34px] h-[51px] rounded-md object-cover shrink-0 bg-[#0a2955]"
                                />
                                <div className="min-w-0">
                                    <p className="text-white text-[14px] truncate">{getTitle(item)}</p>
                                    <p className="text-gray-400 text-[12px]">
                                        {item.media_type === "tv" ? "TV Show" : "Movie"}
                                        {formatDate(getReleaseDate(item), "YYYY") && ` · ${formatDate(getReleaseDate(item), "YYYY")}`}
                                        {item.vote_average > 0 && ` · ★ ${item.vote_average.toFixed(1)}`}
                                    </p>
                                </div>
                            </li>
                        ))}
                        {items.length > 0 && (
                            <li
                                role="option"
                                aria-selected={false}
                                onClick={() => finish(`/search/${encodeURIComponent(query.trim())}`)}
                                className="px-4 py-3 text-[13px] text-[#da2f68] border-t border-[#173d77] cursor-pointer hover:bg-[#173d77]"
                            >
                                See all results for &lsquo;{query.trim()}&rsquo;
                            </li>
                        )}
                    </ul>
                )}
            </div>
            <button type="submit" aria-label="Search" className={`flex justify-center items-center rounded-e-full ${buttonClassName}`}>
                {buttonLabel}
            </button>
        </form>
    )
}

SearchForm.propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    buttonLabel: PropTypes.node,
    autoFocus: PropTypes.bool,
    onSearch: PropTypes.func,
};

export default SearchForm
