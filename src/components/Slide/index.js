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
import Swal from "sweetalert2";
import iconCat from "~/assets/img/meomeo.gif";

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

  // Hiệu ứng Fade
  const [fade, setFade] = useState(false);

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
      if (!newMovie.slug) return;
      try {
        const [img, getFilms] = await Promise.all([
          // Lấy ảnh slide
          getFilmImage(newMovie.slug),

          // Lấy thông tin phim đó
          getFilm(newMovie.slug),
        ]);

        // Tìm backdropImage ảnh
        const backdropImage = img?.images?.find(
          (img) => img.type === "backdrop"
        );
        
        // Bắt đầu fade
        setFade(true);
        
        await new Promise((resolve) => setTimeout(resolve, 600)); // Chờ 0.6s để ảnh cũ mờ hẳn

        // Cập nhật dữ liệu ảnh mới
        setDesMovie(getFilms.seoOnPage.descriptionHead);
        setCategory(newMovie.category);
        // Tạo URL ảnh
        if (backdrop) {
          setBackdrop(
            "https://image.tmdb.org/t/p/w1280" +
              backdropImage.file_path +
              "/images"
          );
        }
        await new Promise((resolve) => setTimeout(resolve, 100)); // chờ 0.1s đảm bảo ảnh tiếp theo hiện lên

        setFade(false);
      } catch (error) {
        console.log(error)
      }
    };

    fetchImage();
  }, [newMovie]);

  // Lấy ra mảng phim có 7 phần tử
  const nMovies = newMovies.slice(0, 7);

  useEffect(() => {
    if (nMovies.length === 0) return;

    const interval = setInterval(() => {
      setNewMovie((prev) => {
        // prev : phim trước đấy
        const currentIndex = nMovies.findIndex((m) => m.slug === prev.slug); // Lấy ra index hiện tại
        const nextIndex = (currentIndex + 1) % nMovies.length; // toán tử lấy phần dư (3 + 1) % 4 = 0
        // console.log(nMovies[nextIndex])
        return nMovies[nextIndex];
      });
    }, 40000);

    return () => clearInterval(interval);
  }, [nMovies]);

  // Alert thông báo chức năng chưa làm
  const handleFavoirite = () => {
    Swal.fire({
      title:
        '<strong style=  "font-weight: 400;"> Chức năng đang được cập nhật!</strong>',
      html: `
      <p style="font-size: 16px; color: #ddd; margin-top: 8px;">
        Tính năng yêu thích sẽ sớm ra mắt. Hãy quay lại sau nhé!
      </p>
    `,
      background: "rgba(20,20,20,0.95)",
      color: "#fff",
      width: 480,
      padding: "2.5em 1.5em",
      showConfirmButton: true,
      // timer: 2200,
      backdrop: `
      rgba(0,0,0,0.6)
      url(${iconCat})
     left top 
      no-repeat
    `,
    });
  };

  if (!newMovies) return <p>Đang tải phim...</p>;

  const handleOnclick = (item) => {
    setNewMovie(item);
  };
  console.log(nMovies);

  return (
    <div className={cx("test")}>
      <div className={cx("top-slide")}>
        <div className={cx("slide-wrapper")}>
          <div className={cx("abc")}>
            <img
              className={cx("img-mask", { "fade-out": fade })}
              src={backdrop}
              alt=""
            />
        <div className={cx("safe-area")}>
          <div className={cx("slide-content")}>
            <div className={cx("media-item")}>
              <h3 className={cx("title-alias-title")}>
                <Link to={"/phim/"+ newMovie?.slug}>{newMovie.name}</Link>
              </h3>
              <div className={cx("hl-tags")}>
                <div className={cx("tag-model")}>
                  <span>
                    <strong>TMDB {newMovie?.tmdb?.vote_average}</strong>
                  </span>
                </div>
                <div className={cx("tag-classic")}>
                  <span>{newMovie.year}</span>
                </div>
                <div className={cx("tag-classic")}>
                  <span>{newMovie.time}</span>
                </div>
              </div>
              <div className={cx("hl-tags", "mb-4")}>
                {category.map((ct, idx) => (
                  <Link
                    to={`/the-loai/${ct.slug}`}
                    className={cx("tag-topic")}
                    key={idx}
                  >
                    {ct.name}
                  </Link>
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
                  <a href="#" onClick={handleFavoirite} className={cx("item")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </a>
                  <a href="#" onClick={handleFavoirite} className={cx("item")}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </a>
                </div>
              </div>
            </div>
            <div className={cx("swiper")}>
              <div className={cx("swiper-wrapper")}>
                {nMovies.map((item, index) => (
                  <div
                    className={cx("swiper-slide", {
                      active: item.slug === newMovie.slug,
                    })}
                    onClick={() => handleOnclick(item)}
                    key={index}
                  >
                    <img
                      alt={item?.name}
                      loading="lazy"
                      src={imageBase + item?.thumb_url}
                    ></img>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Slide;
