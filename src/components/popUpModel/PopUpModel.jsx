/* eslint-disable react/prop-types */

import ReactPlayer from "react-player"

const PopUpModel = ({ show, close, videoData }) => {

    const closeHandle = (e) => {
        if (e.target.id === "close")
            close()
    }

    if (!show) {
        return
    } else
        return (
            <div id="close" className="fixed inset-0 z-10 bg-opacity-70 bg-gray-800 flex justify-center items-center" onClick={closeHandle}>
                <div className="md:p-5 absolute w-full md:w-[640px] md:h-[360px]">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${videoData}`}
                        controls
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        )
}

export default PopUpModel