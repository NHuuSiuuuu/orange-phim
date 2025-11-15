import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Header.scss";
import logo from "~/assets/img/logo.png";

import Search from "../Search";
import NationList from "../NationList";
import CategoryList from "../CategoryList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [isActive, setIsActive] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNavigate, setNavigate] = useState(false);
  // Kích thước trình duyệt
  const [width, setWidth] = useState(window.innerWidth)
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
    
    // Sự kiện thay đổi kích thước trình duyệt
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll); //clear đi tránh rỏ rì bộ nhớ
      window.removeEventListener("resize", handleResize); //clear đi tránh rỏ rì bộ nhớ
    };

  }, []);
  // console.log(isActive);
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    console.log(showSearch);
  };

  return (
    <div className={isActive ? "header fixed" : "header"}>
      {/* Icon bars */}
      <div onClick={() => setNavigate(!showNavigate)} className="bars navbars">
        <FontAwesomeIcon icon={faBars} />
      </div>

      {showNavigate && (
        <div
          //Xử lý ẩn navi khi click vào thẻ 2
          onClick={(e) => {
            // Nếu click vào thẻ a thì =>
            if (e.target.tagName === "A") {
              setNavigate(false);
            }
          }}
          className="mobile_el-group"
        >
          <div className="home">
            <Link to="/">Trang Chủ</Link>
          </div>

          <div className="m-single">
            <Link to="/danh-sach/phim-le">Phim Lẻ</Link>
          </div>

          <div className="m-series">
            <Link to="/danh-sach/phim-bo">Phim Bộ</Link>
          </div>

          <CategoryList />

          <NationList />
        </div>
      )}

      <div className="logo">
        <Link to="/">
          <div className="logo_">
            <div>
              <img src={logo} alt="Orange Movie" />
            </div>{" "}
            <div>
              <h2>Orange Phim</h2>
            </div>
          </div>
        </Link>
      </div>
      {/* Khi ở responsive pc thì hiện ô input */}
      {(showSearch ||  (width >= 1024 )) && <Search />}

      {/* Icon search */}
      {!showSearch && (
        <div onClick={toggleSearch} className="bars for-mobile_search ">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      )}
      {showSearch && (
        <div onClick={toggleSearch} className="bars for-mobile_close">
          <FontAwesomeIcon icon={faXmark} />
        </div>
      )}

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

        <CategoryList />

        <NationList />
      </div>
    </div>
  );
}

export default Header;
