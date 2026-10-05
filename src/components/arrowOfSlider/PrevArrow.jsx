import PropTypes from "prop-types";
import { FaCircleArrowLeft } from "react-icons/fa6";

const PrevArrow = ({ onClick }) => (
    <button
        type="button"
        aria-label="Previous"
        className="absolute top-1/2 left-8 -ml-6 z-[5] bg-transparent opacity-85 text-gray-800 text-[35px] rounded-full p-2 -translate-y-1/2 disabled:opacity-30"
        onClick={onClick}
        disabled={!onClick}
    >
        <FaCircleArrowLeft />
    </button>
);

PrevArrow.propTypes = {
    onClick: PropTypes.func,
};

export default PrevArrow
