import PropTypes from "prop-types";
import { FaChevronRight } from "react-icons/fa6";
import { arrowClass } from "./arrowClass";

const NextArrow = ({ onClick }) => (
    <button
        type="button"
        aria-label="Next"
        className={`${arrowClass} right-0`}
        onClick={onClick}
        disabled={!onClick}
    >
        <FaChevronRight />
    </button>
);

NextArrow.propTypes = {
    onClick: PropTypes.func,
};

export default NextArrow
