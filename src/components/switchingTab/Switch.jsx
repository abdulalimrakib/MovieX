/* eslint-disable react/prop-types */
import { useState } from "react";

const Switch = ({ tabs, getTabMethod }) => {
    const [selectedTab, setSelectedTab] = useState(0)

    const tabChangerHandle = (tab, index) =>{
        setSelectedTab(index)
        getTabMethod(tab)
    }


    return (
        <div className="flex items-center h-[40px] bg-white rounded-3xl p-1" >
            {
                tabs.map((tab, index) => (
                    <span key={index} className={`w-[100px] flex justify-center items-center h-full rounded-3xl hover:cursor-pointer ${selectedTab === index ? "text-white bg-gradient-to-r from-[#FD8E28] to-[#CE1763]" : ""}`} onClick={() => tabChangerHandle(tab, index)}>{tab}</span>
                ))
            }
        </div >
    )
}

export default Switch