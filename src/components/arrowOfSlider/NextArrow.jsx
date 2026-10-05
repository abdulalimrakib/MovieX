import PropTypes from "prop-types";
import { FaCircleArrowRight } from "react-icons/fa6";

const NextArrow = ({ onClick }) => (
    <button
        type="button"
        aria-label="Next"
        className="absolute top-1/2 right-2 -ml-6 z-[5] bg-transparent opacity-85 text-gray-800 text-[35px] rounded-full p-2 -translate-y-1/2 disabled:opacity-30"
        onClick={onClick}
        disabled={!onClick}
    >
        <FaCircleArrowRight />
    </button>
);

NextArrow.propTypes = {
    onClick: PropTypes.func,
};

export default NextArrow
