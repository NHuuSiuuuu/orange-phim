import classNames from "classnames/bind";
// import styles from "./PageMovieSeries.module.scss";
import "./PageMovieSeries.scss";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilmsCommon } from "~/services";
import LoadingIcon from "../../components/LoadingIcon";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function PageMovieSeries({ type }) {
  // const cx = classNames.bind(styles);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const prams = useParams();
  //   console.log(prams);
  const [movies, setMovie] = useState([]);
  const [quantityPage, setQuantityPage] = useState(1);

  const imageBase = "https://img.ophim.live/uploads/movies/";

  const [descriptionHead, setDescriptionHead] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const ct = await getFilmsCommon(type, prams.slug, currentPage);
        const items = ct.items || [];
        setMovie(items);
        setDescriptionHead(ct.titlePage || "");
        setQuantityPage(
          Math.ceil(ct?.params?.pagination?.totalItems / 30) || 1
        );

        if (items.length > 0) {
          const thumbs = items.map((it) => imageBase + it.thumb_url);
          await Promise.all(
            thumbs.map(
              (src) =>
                new Promise((resolve) => {
                  const img = new Image();
                  img.src = src;
                  img.onload = img.onerror = () => resolve(src);
                })
            )
          );
        }

        // Cuộn đầu trang
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("PageMovieSeries load error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, prams.slug, type]);
  //   console.log("Tổng số trang: ", quantityPage);
  console.log(type);
  const handleNext = () => {
    if (currentPage < quantityPage) {
      setSearchParams({ page: currentPage + 1 });
    }
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  };

  return (
    <div className="wrapper" style={{ color: "#fff" }}>
      <h3 className="category-name">
        {" "}
        {type == "quoc-gia" ? `Phim ${descriptionHead}` : descriptionHead}{" "}
      </h3>
      {/*  */}
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="swiper-wrapper">
          {movies.map((item, index) => (
            <Link
              to={`/phim/${item.slug}`}
              key={index}
              className="swiper-slide"
            >
              {/* Từng phần tử */}
              <div className="sw-cover">
                <div className="sw-cover_a">
                  {/* icon biểu tượng chú thích */}
                  <div className="pin-new">
                    <div className="line-center">{item.episode_current}</div>
                  </div>
                  <div>
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
      )}

      <div className="v-pagination">
        <div className="page-control">
          <button className="btn-circle" onClick={handlePrev}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="page-current">
            <div>
              Trang {currentPage} / {quantityPage}
            </div>
          </div>
          <button className="btn-circle" onClick={handleNext}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageMovieSeries;
