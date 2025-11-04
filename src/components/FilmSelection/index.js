import { useRef, useState } from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styles from "./FilmSelection.module.scss"
import classNames from "classnames/bind";

function FilmSelection({ films, title, visibleCount = 40, loading = false }) {
  const cx = classNames.bind(styles)
  const refList = useRef(null)

  // console.log(refList.current)
  const [startIndex, setStartIndex] = useState(0);
  const imageBase = "https://img.ophim.live/uploads/movies/";

  const scroll = (direction) => {
    const scrollAmount = 500
    if (direction == "next") {
      refList.current.scrollLeft += scrollAmount 

    }else {
      refList.current.scrollLeft -= scrollAmount 

    }

  }

 
  const visibleMovie = films.slice(startIndex, visibleCount + startIndex);
  // console.log("Độ dài mảng: ", visibleMovie.length);
  // console.log(visibleMovie);
  // console.log("Vị trí ban đầu: ", startIndex);
  if (loading) {
    return <h3>Đang tải.....</h3>;
  }
  return (
    <div className={cx("cards-row cards-slide")}>
      <div className={cx("topics-list single")}>
        {/* List phim theo từng chủ đề */}
        <div className={cx("collection")}>
          <div className={cx("row-topic")}>
            <div className={cx("intro")}>
              <div className={cx("heading-md")}>{title}</div>
            </div>

            <div className={cx("row-content")}>
              <div className={cx("cards-slide-wrapper")}>
                {/* Nút điều hướng */}
                <div className={cx("sw-navigation")}>
                  <button className={cx("sw-button", "sw-prev")} onClick={()=>scroll('next')}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                  <button className={cx("sw-button", "sw-next")} onClick={()=>scroll('prev')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                </div>

                {/* Swiper */}
                <div ref={refList} className={cx("swiper-wrapper")}>
                  {visibleMovie.map((films, index) => (
                    <Link to={"/phim/" + films.slug} key={index} className={cx("swiper-slide")}>
                      {/* Từng phần tử */}
                      <div className={cx("sw-cover")}>
                        <div className={cx("sw-cover_a")}>
                          {/* icon biểu tượng chú thích */}
                          <div className={cx("pin-new")}>
                            <div className={cx("line-center")}>
                              {films.episode_current}
                            </div>
                          </div>
                          <div>
                            <img src={imageBase + films.thumb_url} alt="" />
                          </div>
                        </div>
                        {/* Tên phim */}
                        <div className={cx("h-item")}>
                          <div className={cx("info")}>
                            <h4 className={cx("item-title")}>
                              <p>{films.name}</p>
                            </h4>
                            <h4 className={cx("alias-title")}>
                              <p>{films.origin_name}</p>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------- */}
      </div>
    </div>
  );
}

export default FilmSelection;
