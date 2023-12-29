import ShowDetails from "../components/detailsSection/ShowDetails"
import Recommendation from "../components/recommendations/Recommendation"
import Similar from "../components/similar/Similar"


function Details() {
  return (
    <div>
      <ShowDetails />
      <Similar />
      <Recommendation />
    </div>
  )
}

export default Details