/* eslint-disable react/prop-types */

const PopUpModel = ({ show, close }) => {

    const closeHandle = (e) => {
        if (e.target.id === "close")
            close()
    }

    if (!show) {
        return
    } else
        return (
            <div id="close" className="fixed inset-0 z-10 opacity-70 bg-gray-800 flex justify-center items-center" onClick={closeHandle}>
                <div className="p-5 relative">Trailer Area</div>
            </div>
        )
}

export default PopUpModel