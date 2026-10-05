import PropTypes from "prop-types";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Img = ({ src, alt = "", className = "" }) => (
  <LazyLoadImage
    alt={alt}
    effect="blur"
    className={className}
    wrapperClassName="lazy-img"
    src={src} />
);

Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default Img
