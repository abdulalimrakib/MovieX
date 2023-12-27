import HeroBanner from "../components/heroBanner/HeroBanner"
import Populer from "../components/populerSection/Populer"
import TopRated from "../components/topRatedSection/TopRated"
import Trending from "../components/trendingSection/Trending"


function Home() {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <div className="my-10 flex flex-col gap-5">
        <Trending />
        <Populer />
        <TopRated />
      </div>
    </div>
  )
}

export default Home