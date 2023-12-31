/* eslint-disable react/prop-types */
import { FaCircleArrowRight } from "react-icons/fa6";

const NextArrow = ({ onClick }) => (
    <button
        className="absolute top-1/2 right-2 -ml-6 z-10 bg-transparent opacity-85 text-gray-800 text-[35px] rounded-full p-2 transform -translate-y-1/2 focus:outline-none"
        onClick={onClick}
    >
        <FaCircleArrowRight />
    </button>
);

export default NextArrow