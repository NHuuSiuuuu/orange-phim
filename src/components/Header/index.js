import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Header.scss";
import logo from "~/assets/img/logo.png";

import Search from "../Search";

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
          <Link to="/phim-le">Phim Lẻ</Link>
        </div>

        <div className="m-series">
          <Link to="/phim-bo">Phim Bộ</Link>
        </div>

        <div className="m-series">
          <Link to="/phim-bo">Diễn Viên</Link>
        </div>

        <div className="nation">
          <Link to="/quoc-gia">Quốc Gia</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
