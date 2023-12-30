/* eslint-disable react/prop-types */
import { useState } from "react";

const Switch = ({ tabs, getTabMethod }) => {
    const [selectedTab, setSelectedTab] = useState(0)

    const tabChangerHandle = (tab, index) =>{
        setSelectedTab(index)
        getTabMethod(tab)
    }


    return (
        <div className="flex items-center h-[28px] md:h-[40px] bg-white rounded-xl md:rounded-3xl text-[12px] md:text-[16px] md:p-1 font-bold text-center" >
            {
                tabs.map((tab, index) => (
                    <span key={index} className={`w-[50px] md:w-[100px] flex justify-center items-center h-full rounded-xl md:rounded-3xl hover:cursor-pointer ${selectedTab === index ? "text-white bg-gradient-to-r from-[#FD8E28] to-[#CE1763]" : ""}`} onClick={() => tabChangerHandle(tab, index)}>{tab}</span>
                ))
            }
        </div >
    )
}

export default Switch