import PropTypes from "prop-types";
import { FaChevronLeft } from "react-icons/fa6";
import { arrowClass } from "./arrowClass";

const PrevArrow = ({ onClick }) => (
    <button
        type="button"
        aria-label="Previous"
        className={`${arrowClass} left-0`}
        onClick={onClick}
        disabled={!onClick}
    >
        <FaChevronLeft />
    </button>
);

PrevArrow.propTypes = {
    onClick: PropTypes.func,
};

export default PrevArrow
