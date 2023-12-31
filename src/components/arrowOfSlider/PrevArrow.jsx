/* eslint-disable react/prop-types */
import { FaCircleArrowLeft } from "react-icons/fa6";

const PrevArrow = ({ onClick }) => {
    return (
        <button
            className="absolute top-1/2 left-8 -ml-6 z-10 bg-transparent opacity-85 text-gray-800 text-[35px] rounded-full p-2 transform -translate-y-1/2 focus:outline-none"
            onClick={onClick}
        >
            <FaCircleArrowLeft />
        </button>
    )
}

export default PrevArrow