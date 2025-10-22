import classNames from "classnames/bind";
import styles from "./PageFilmsCategory.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilmsCategory } from "~/services";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function PageFilmsCategory() {
  const cx = classNames.bind(styles);
  const prams = useParams();
  console.log(prams);
  const [movies, setMovie] = useState([]);
  const [pageActive, setPageActive] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1);
  const imageBase = "https://img.ophim.live/uploads/movies/";

  const [descriptionHead, setDescriptionHead] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const ct = await getFilmsCategory(prams.slug, pageActive);
      setMovie(ct.items);
      setDescriptionHead(ct.seoOnPage.descriptionHead);
      setQuantityPage(Math.ceil(ct?.params?.pagination?.totalItems / 30));
    };
    fetchData();
  }, [pageActive]);
  console.log("Tổng số trang: ", quantityPage);

  const handleNext = () => {
    if (pageActive > 0) {
      setPageActive(pageActive + 1);
    }
  };
  const handlePrev = () => {
    if (pageActive > 1) {
      setPageActive(pageActive - 1);
    }
  };
  //   console.log(movies);
  return (
    <div className={cx("wrapper")} style={{ color: "#fff" }}>
      <h3 className={cx("category-name")}>{descriptionHead}</h3>
      {/*  */}
      <div className="swiper-wrapper">
        {movies.map((item, index) => (
          <Link to={`/phim/${item.slug}`} key={index} className="swiper-slide">
            {/* Từng phần tử */}
            <div className="sw-cover">
              <div className="sw-cover_a">
                {/* icon biểu tượng chú thích */}
                <div className="pin-new">
                  <div className="line-center">{item.episode_current}</div>
                </div>
                <div>
                  {/* <img src={item} alt="" /> */}
                  <img src={imageBase + item.thumb_url} alt="" />
                </div>
              </div>
              {/* Tên phim */}
              <div className="h-item">
                <div className="info">
                  <h4 className="item-title">
                    <p>{item.name}</p>
                  </h4>
                  <h4 className="alias-title">
                    <p>{item.origin_name}</p>
                  </h4>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className={cx("v-pagination")}>
        <div className={cx("page-control")}>
          <button className={cx("btn-circle")} onClick={handlePrev}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className={cx("page-current")}>
            <div>
              Trang {pageActive} / {quantityPage}
            </div>
          </div>
          <button className={cx("btn-circle")} onClick={handleNext}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      {/* 
      <h3>
      </h3> */}
    </div>
  );
}

export default PageFilmsCategory;
