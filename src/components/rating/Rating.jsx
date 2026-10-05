import PropTypes from "prop-types";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ratingColor = (value) => value < 5 ? "red" : value < 7 ? "orange" : "green"

const Rating = ({ value }) => {
    const score = Number(value) || 0
    const color = ratingColor(score)

    return (
        <CircularProgressbar
            value={score}
            maxValue={10}
            text={score.toFixed(1)}
            styles={buildStyles({
                pathColor: color,
                textSize: "50px",
                textColor: color,
            })}
            className='bg-white rounded-full font-medium md:font-bold p-[1px]'
        />
    )
}

Rating.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Rating
