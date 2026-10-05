import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";

/**
 * Search box shared by the hero banner and the header. Submitting navigates to
 * the (URL-encoded) search page; `onSearch` lets the caller close itself.
 */
const SearchForm = ({ className = "", inputClassName = "", buttonClassName = "", buttonLabel = <HiOutlineSearch />, autoFocus = false, onSearch }) => {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimmed = query.trim()
        if (!trimmed) return
        navigate(`/search/${encodeURIComponent(trimmed)}`)
        setQuery("")
        onSearch?.()
    }

    return (
        <form role="search" onSubmit={handleSubmit} className={`flex justify-center items-center ${className}`}>
            <input
                type="search"
                name="search"
                aria-label="Search for a movie or TV show"
                placeholder="Search for a movie or TV show..."
                autoFocus={autoFocus}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-[80%] rounded-s-full truncate bg-white text-black ${inputClassName}`}
            />
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
