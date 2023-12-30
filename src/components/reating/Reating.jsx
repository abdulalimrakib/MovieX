/* eslint-disable react/prop-types */
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Reating = ({ value }) => {

    return (
        <CircularProgressbar
            value={value}
            maxValue={10}
            text={value}
            styles={buildStyles({
                pathColor: value < 5 ? "red" : value < 7 ? "orange" : "green",
                textSize: "50px",
                textColor: value < 5 ? "red" : value < 7 ? "orange" : "green"
            })}

            className=' bg-white rounded-full font-medium md:font-bold p-[1px]'
        />
    )
}

export default Reating