import React from "react";
import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";

const Body = () => {
    return (
        <div className="flex bg-white dark:bg-gray-900 transition-colors duration-200 min-h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 min-w-0 overflow-hidden">
                <MainContainer />
            </div>
        </div>
    );
};

export default Body;