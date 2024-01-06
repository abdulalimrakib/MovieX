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
                <div className="p-5 absolute">
                    <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoData}`}
                    controls
                    />
                </div>
            </div>
        )
}

export default PopUpModel