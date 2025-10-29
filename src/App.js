import { useEffect, useState } from "react";
import AllRoute from "./components/AllRoute";
import ScrollToTop from "./components/ScrollToTop";
import LoadingIcon from "./components/LoadingIcon";

function App() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Giả lập chờ dữ liệu (API, hình ảnh, v.v.)
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000); // 2 giây
  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="loading-screen">
  //       <LoadingIcon/>
  //     </div>
  //   );
  // }
  return (
    <>
      <ScrollToTop />
      <AllRoute />
    </>
  );
}

export default App;
