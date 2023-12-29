import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import { useSelector } from "react-redux"
import Img from './../Img';
import './showDetails.scss'
import Reating from './../reating/Reating';
import dayjs from "dayjs";

const ShowDetails = () => {
    const { mediaType, id } = useParams()
    const { isLoading, data } = useFetch(`/${mediaType}/${id}`)
    const { isLoading: creditsLoadong, data: creditsData } = useFetch(`/${mediaType}/${id}/credits`)
    const { url } = useSelector(state => state.home)

    const director = creditsData?.crew?.filter(data => data?.job === "Director")
    const writer = creditsData?.crew?.filter(data => data?.job === "Story")

    console.log(creditsData);

    const imgUrl = url?.backdrop + data?.backdrop_path



    return (
        <div className="">
            {!isLoading ? (
                <>
                    <div className="">
                        <div className="absolute opacity-10 bg-cover bg-center w-full h-full">
                            <Img src={imgUrl} />
                        </div>
                        <div className="opacity-layer">
                            {/* for opacity */}
                        </div>
                    </div>
                    <div className="flex justify-center items-center px-[150px]">
                        <div className="text-white grid gap-8 grid-cols-2 relative pt-[100px] mb-10">
                            <div>
                                <Img src={imgUrl} />
                            </div>
                            <div className="py-4">
                                <div className="mb-3">
                                    <span className="text-[26px] font-medium">{data.name || data.title} (<span>{dayjs(data.release_date).format("YYYY") || dayjs(data.last_air_date).format("YYYY") || dayjs(data.first_air_date).format("YYYY")}</span>)</span>
                                </div>
                                <div className="mb-6">
                                    <span className="italic text-gray-500">{data.tagline}</span>
                                </div>
                                <div className="w-[55px] mb-6">
                                    <Reating value={data.vote_average.toFixed(1)} />
                                </div>
                                <div>
                                    <h3 className="text-[20px]">Overview</h3>
                                    <p className="text-[16px] text-gray-300 my-2">{data.overview}</p>
                                </div>
                                <div className="flex justify-between items-center py-5 border-b-[0.5px] border-gray-500">
                                    <div>
                                        <span className="text-[14px]">status: </span>
                                        <span className="text-[14px] ml-1 text-gray-400">{data.status}</span>
                                    </div>
                                    <div>
                                        <span className="text-[14px]">Release date: </span>
                                        <span className="text-[14px] ml-1 text-gray-400">{dayjs(data.release_date).format("MMM D, YYYY") || dayjs(data.last_air_date).format("MMM D, YYYY") || dayjs(data.first_air_date).format("MMM D, YYYY")}</span>
                                    </div>
                                    <div>
                                        <span className="text-[14px]">Run time: </span>
                                        <span className="text-[14px] ml-1 text-gray-400">{data.runtime} min</span>
                                    </div>
                                </div>
                                <div className="py-5 border-b-[0.5px] border-gray-400">
                                    <div>
                                        <span className="text-[14px]">Director: </span>
                                        {!creditsLoadong && <span className="text-[14px] ml-1 text-gray-400">{director?.length > 0 ? director[0].name : ""}</span>}
                                    </div>
                                </div>
                                <div className="py-5 border-b-[0.5px] border-gray-500">
                                    <div>
                                        <span className="text-[14px]">writer: </span>
                                        {!creditsLoadong &&
                                            writer.map((w, i) => {
                                                return <span key={i} className="text-[14px] ml-1 text-gray-400">
                                                    {w.name} {writer.length - 1 !== i && ", "}
                                                </span>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : ""
            }
        </div>
    )
}

export default ShowDetails