import SlickModule from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// react-slick is CommonJS with an `exports.default`. Vite 8 follows Node's
// interop rules for "type": "module" packages, so the default import is the
// whole exports object in production builds; unwrap it here, once.
//
// Pinned to 0.30.3: 0.31 replaced enquire.js with matchMedia listeners that
// only fire on resize, so `responsive` settings are ignored on first load.
const Slider = SlickModule.default ?? SlickModule

export default Slider
