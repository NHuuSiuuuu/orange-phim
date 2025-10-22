import { useState } from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FilmSelection.scss";
import { Link } from "react-router-dom";

function FilmSelection({ films, title, visibleCount = 4, loading = false }) {
  const [startIndex, setStartIndex] = useState(0);
  const imageBase = "https://img.ophim.live/uploads/movies/";

  const handleNext = () => {
    if (startIndex + visibleCount < films.length) {
      setStartIndex((startIndex) => startIndex + 1);
    }
  };
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((startIndex) => startIndex - 1);
    }
  };
  const visibleMovie = films.slice(startIndex, visibleCount + startIndex);
  // console.log("Độ dài mảng: ", visibleMovie.length);
  // console.log(visibleMovie);
  // console.log("Vị trí ban đầu: ", startIndex);
  if (loading) {
    return <h3>Đang tải.....</h3>;
  }
  return (
    <div className="cards-row cards-slide">
      <div className="topics-list single">
        {/* List phim theo từng chủ đề */}
        <div className="collection">
          <div className="row-topic">
            <div className="intro">
              <div className="heading-md">{title}</div>
            </div>

            <div className="row-content">
              <div className="cards-slide-wrapper">
                {/* Nút điều hướng */}
                <div className="sw-navigation">
                  <button className="sw-button sw-prev" onClick={handleNext}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                  <button className="sw-button sw-next" onClick={handlePrev}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                </div>

                {/* Swiper */}
                <div className="swiper-wrapper">
                  {visibleMovie.map((films, index) => (
                    <Link to={"/phim/" + films.slug} key={index} className="swiper-slide">
                      {/* Từng phần tử */}
                      <div className="sw-cover">
                        <div className="sw-cover_a">
                          {/* icon biểu tượng chú thích */}
                          <div className="pin-new">
                            <div className="line-center">
                              {films.episode_current}
                            </div>
                          </div>
                          <div>
                            <img src={imageBase + films.thumb_url} alt="" />
                          </div>
                        </div>
                        {/* Tên phim */}
                        <div className="h-item">
                          <div className="info">
                            <h4 className="item-title">
                              <p>{films.name}</p>
                            </h4>
                            <h4 className="alias-title">
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
