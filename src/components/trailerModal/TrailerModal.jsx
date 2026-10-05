import PropTypes from "prop-types";
import { useEffect, useRef } from "react"
import { RiCloseFill } from "react-icons/ri";

const TrailerModal = ({ show, close, videoKey }) => {
    const closeButtonRef = useRef(null)

    useEffect(() => {
        if (!show) return
        const onKeyDown = (e) => {
            if (e.key === "Escape") close()
        }
        document.addEventListener("keydown", onKeyDown)
        closeButtonRef.current?.focus()
        return () => document.removeEventListener("keydown", onKeyDown)
    }, [show, close])

    if (!show || !videoKey) return null

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Trailer"
            className="fixed inset-0 z-50 bg-gray-800/70 flex justify-center items-center"
            onClick={(e) => e.target === e.currentTarget && close()}
        >
            <div className="relative w-full md:w-[640px] aspect-video md:p-5">
                <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label="Close trailer"
                    onClick={close}
                    className="absolute -top-10 right-2 md:-top-8 md:right-0 text-white text-[32px] hover:text-[#DD3B5D] duration-200"
                >
                    <RiCloseFill />
                </button>
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoKey)}?autoplay=1`}
                    title="Trailer"
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="w-full h-full"
                />
            </div>
        </div>
    )
}

TrailerModal.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    videoKey: PropTypes.string,
};

export default TrailerModal
