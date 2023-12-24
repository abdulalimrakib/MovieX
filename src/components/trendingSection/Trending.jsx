import { useState } from "react"
import Switch from "../switchingTab/Switch"
import useFetch from "../../hooks/useFetch"

const Trending = () => {
    const [trendingData, setTrendingData] = useState("day")
    const { isLoading, data } = useFetch(`/trending/all/${trendingData}`)

    const timeOfTrendingData = (time) => {
        setTrendingData(time.toLowerCase())
    }

    return (
        <div className="flex justify-between px-10">
            <div>
                <span className="text-3xl text-[#D2225C] font-medium">Trending</span>
            </div>
            <div>
                <Switch tabs={["Day", "Week"]} getTabMethod={timeOfTrendingData} />
            </div>
        </div>
    )
}

export default Trending