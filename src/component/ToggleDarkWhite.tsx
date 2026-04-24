"use client"
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { useState } from 'react';


const ToggleDarkWhite = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    // console.log(isDarkMode)

    return (
        // Fixed top-right toggle - stays on screen while scrolling
        // if toggle offIcoon is  dark then white bg-white in div and if toggle onIcon is white then dark bg-gray-800 in div
        <div
            onClick={toggleDarkMode}
            className="fixed top-4 right-4 z-50 cursor-pointer px-3 py-1 backdrop-blur-sm border rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 bg-grey-800 text-grey-300 dark:bg-gray-800 dark:text-gray-300"
        >
            {isDarkMode ? (
                <ToggleOffIcon className=" w-5 h-5" />
            ) : (
                <ToggleOnIcon className="  w-5 h-5" />
            )}
        </div>
    )
}



export default ToggleDarkWhite
