import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Header.scss";
import logo from "~/assets/img/logo.png";

import Search from "../Search";
import NationList from "../NationList";
import CategoryList from "../CategoryList";

function Header() {
  const [isActive, setIsActive] = useState(false);
  window.onscroll = function () {
    // console.log(Math.floor(window.scrollY));
  };
  useEffect(() => {
    const handleScroll = () => {
      if (Math.floor(window.scrollY) >= 18) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);//clear đi tránh rỏ rì bộ nhớ
    }; 
  }, []);
  // console.log(isActive);

  return (
    <div className={isActive ? "header fixed" : "header"}>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Orange Movie" />
        </Link>
      </div>
      <Search/>

      <div className="el-group">
        <div className="home">
          <Link to="/">Trang Chủ</Link>
        </div>

        <div className="m-single">
          <Link to="/danh-sach/phim-le">Phim Lẻ</Link>
        </div>

        <div className="m-series">
          <Link to="/danh-sach/phim-bo">Phim Bộ</Link>
        </div>

       <CategoryList/>

       <NationList/>
      </div>
    </div>
  );
}

export default Header;
