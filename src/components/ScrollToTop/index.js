import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  //  lấy thông tin về URL hiện tại
  const location = useLocation();

  useEffect(() => {
    // scroll to top whenever pathname or search changes
    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  }, [location.pathname, location.search]);

  return null;
}

export default ScrollToTop;
