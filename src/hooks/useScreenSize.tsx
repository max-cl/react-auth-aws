import { useEffect, useState } from "react";

export const useScreenSize = () => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);

    const handleWindowResize = () => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
    };

    useEffect(() => {
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return { screenWidth, screenHeight };
};
