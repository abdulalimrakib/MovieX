/* eslint-disable react/prop-types */

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Img = ({ src }) => (
  <LazyLoadImage
    alt=""
    effect="blur"
    src={src} />
);

export default Img