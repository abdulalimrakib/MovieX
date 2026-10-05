import PropTypes from "prop-types";
import { useState } from "react";

const Switch = ({ tabs, onChange }) => {
    const [selectedTab, setSelectedTab] = useState(0)

    const tabChangerHandle = (tab, index) => {
        setSelectedTab(index)
        onChange(tab)
    }

    return (
        <div role="tablist" className="flex items-center h-[28px] md:h-[40px] bg-white text-black rounded-xl md:rounded-3xl text-[12px] md:text-[16px] md:p-1 font-bold text-center">
            {
                tabs.map((tab, index) => (
                    <button
                        key={tab.value}
                        type="button"
                        role="tab"
                        aria-selected={selectedTab === index}
                        className={`w-[60px] md:w-[100px] flex justify-center items-center h-full rounded-xl md:rounded-3xl ${selectedTab === index ? "text-white bg-linear-to-r from-[#FD8E28] to-[#CE1763]" : ""}`}
                        onClick={() => tabChangerHandle(tab, index)}
                    >
                        {tab.label}
                    </button>
                ))
            }
        </div>
    )
}

Switch.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Switch
