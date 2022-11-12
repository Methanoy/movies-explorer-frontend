import { useState, useEffect, useCallback } from 'react';

function useScreenSize() {
    const currentScreenSize = useCallback(() => window.innerWidth, []);
    const [screenSize, setScreenSize] = useState(currentScreenSize);

    useEffect(() => {
        function handleScreenResize() {
            setScreenSize(currentScreenSize)
        }
        window.addEventListener('resize', handleScreenResize)
        return () => window.removeEventListener('resize', handleScreenResize);
    }, [currentScreenSize])
    return screenSize;
}

export default useScreenSize;