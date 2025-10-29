import {
  faCircleInfo,
  faHeart,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Slide.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getFilm, getFilmImage, getTypeListFilmHot } from "~/services";

function Slide() {
  const cx = classNames.bind(styles);
  
  const imageBase = "https://img.ophim.live/uploads/movies/";

  // List phim
  const [newMovies, setNewMovies] = useState([]);

  // Phim
  const [newMovie, setNewMovie] = useState([]);

  // Ảnh poster phim
  const [backdrop, setBackdrop] = useState([]);

  // Mô tả phim
  const [desMovie, setDesMovie] = useState("");

  // Thể loại phim
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTypeListFilmHot();
      setNewMovies(data.items);

      // Lấy phim đầu tiên
      if (data.items && data.items.length > 0) {
        setNewMovie(data.items[0]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      if (!newMovie?.slug) return;
      const img = await getFilmImage(newMovie.slug);
      const getFilms = await getFilm(newMovie.slug);
      setDesMovie(getFilms.seoOnPage.descriptionHead);
      setCategory(newMovie.category);

      const backdropImage = img?.images?.find(
        (backdrop) => backdrop.type === "backdrop"
      );
      if (backdropImage) {
        setBackdrop(
          "https://image.tmdb.org/t/p/original" +
            backdropImage.file_path +
            "/images"
        );
      }
    };
    fetchImage();
  }, [newMovie]);

  if (!newMovies) return <p>Đang tải phim...</p>;

  const nMovies = newMovies.slice(0, 7);

  const handleOnclick = (item) => {
    setNewMovie(item);
  };
  // console.log(category);

  return (
    <div className={cx("test")}>
      <div className={cx("top-slide")}>
        <div className={cx("slide-wrapper")}>
          <div className="abc">
            <img className={cx("img-mask")} src={backdrop} alt="" />
          </div>
        </div>

        <div className={cx("safe-area")}>
          <div className={cx("slide-content")}>
            <div className={cx("media-item")}>
              <div className={cx("media-title-image")}></div>
              <h3 className={cx("media-title")}></h3>
              <h3 className={cx("title-alias-title")}>
                <a href="">{newMovie.name}</a>
              </h3>
              <div className={cx("hl-tags")}>
                <div className={cx("tag-model")}>
                  <span>
                    <strong>{newMovie?.tmdb?.vote_average}</strong>
                  </span>
                </div>
                <div className={cx("tag-classic")}>
                  <span>{newMovie.year}</span>
                </div>
                <div className={cx("tag-classic")}>
                  <span>{newMovie.time}</span>
                </div>
              </div>
              <div className={cx("hl-tags mb-4")}>
                {category.map((ct, idx) => (
                  <a className={cx("tag-topic")} href="" key={idx}>
                    {ct.name}
                  </a>
                ))}
              </div>
              <div className={cx("description")}>{desMovie}</div>
              <div className={cx("touch")}>
                <Link
                  to={"/phim/" + newMovie.slug}
                  className={cx("button-play")}
                >
                  <div>
                    <FontAwesomeIcon
                      className={cx("icon-play")}
                      icon={faPlay}
                    />
                  </div>
                </Link>

                {/* Nhóm nút để tương tác */}
                <div className={cx("touch-group")}>
                  <a href="#" className={cx("item")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </a>
                  <a href="#" className={cx("item")}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </a>
                </div>
              </div>
            </div>
            <div className={cx("swiper")}>
              <div className={cx("swiper-wrapper")}>
                {nMovies.map((item, index) => (
                  <div
                    className={cx("swiper-slide")}
                    onClick={() => handleOnclick(item)}
                    key={index}
                  >
                    <img
                      alt="Xem Phim"
                      loading="lazy"
                      src={imageBase + item.thumb_url}
                    ></img>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide;
