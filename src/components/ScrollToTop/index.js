import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const location = useLocation()
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            bahavior: 'smooth'
        })



    },[location.pathname])
    return null;
}

export default ScrollToTop;