import classNames from "classnames/bind";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilmsCommon } from "~/services";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import LoadingIcon from "~/components/LoadingIcon";
import styles from "./PageMovieSeries.module.scss";

function PageMovieSeries({ type }) {
  const cx = classNames.bind(styles);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const [loading, setLoading] = useState(true);
  const prams = useParams();
  //   console.log(prams);
  const [movies, setMovie] = useState([]);
  const [quantityPage, setQuantityPage] = useState(1);

  const imageBase = "https://img.ophim.live/uploads/movies/";

  const [descriptionHead, setDescriptionHead] = useState("");

  useEffect(
    () => {
      const fetchData = async () => {
        setLoading(true);
        const ct = await getFilmsCommon(type, prams.slug, currentPage);
        setMovie(ct.items);
        setDescriptionHead(ct.titlePage);
        setQuantityPage(Math.ceil(ct?.params?.pagination?.totalItems / 30));
        // Cuộn đầu trang
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
      fetchData();
      setLoading(false);
    },
    [currentPage, prams.slug],
    type
  );
  //   console.log("Tổng số trang: ", quantityPage);
  console.log(type);
  const handleNext = () => {
    if (currentPage < quantityPage) {
      setSearchParams({ page: currentPage + 1 });
    }
  };
  const handlePrev = () => {
    if (currentPage > 0) {
      setSearchParams({ page: currentPage - 1 });
    }
  };

  return (
    <div className={cx("wrapper")} style={{ color: "#fff" }}>
      <h3 className={cx("category-name")}>
        {" "}
        {type == "quoc-gia" ? `Phim ${descriptionHead}` : descriptionHead}{" "}
      </h3>
      {/*  */}
      {loading == true ? (
        <LoadingIcon />
      ) : (
        <div className={cx("swiper-wrapper")}>
          {movies.map((item, index) => (
            <Link
              to={`/phim/${item.slug}`}
              key={index}
              className={cx("swiper-slide")}
            >
              {/* Từng phần tử */}
              <div className={cx("sw-cover")}>
                <div className={cx("sw-cover_a")}>
                  {/* icon biểu tượng chú thích */}
                  <div className={cx("pin-new")}>
                    <div className={cx("line-center")}>
                      {item.episode_current}
                    </div>
                  </div>
                  <div>
                    {/* <img src={item} alt="" /> */}
                    <img src={imageBase + item.thumb_url} alt="" />
                  </div>
                </div>
                {/* Tên phim */}
                <div className={cx("h-item")}>
                  <div className={cx("info")}>
                    <h4 className={cx("item-title")}>
                      <p style={{ fontSize: "13px" }}>{item.name}</p>
                    </h4>
                    <h4 className={cx("alias-title")}>
                      <p style={{ fontSize: "12px", color: "#aaa" }}>
                        {item.origin_name}
                      </p>
                    </h4>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className={cx("v-pagination")}>
        <div className={cx("page-control")}>
          <button className={cx("btn-circle")} onClick={handlePrev}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className={cx("page-current")}>
            <div>
              Trang {currentPage} / {quantityPage}
            </div>
          </div>
          <button className={cx("btn-circle")} onClick={handleNext}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageMovieSeries;
