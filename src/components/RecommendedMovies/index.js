import classNames from "classnames/bind";
import styles from "./RecommendedMovies.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getListFilmRecommended } from "~/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

function RecommendedMovies({ slug }) {
  const cx = classNames.bind(styles);
  const [movies, setMovies] = useState([]);
  const imageBase = "https://img.ophim.live/uploads/movies/";

  const listRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getListFilmRecommended(slug);
      setMovies(data.items);
    };
    fetchData();
  }, []);
  // console.log(movies);

  // Hành vi lăn chuột
  const handleWheel = (e) => {
    listRef.current.scrollLeft = listRef.current.scrollLeft + e.deltaY;
    // console.log( listRef.current.scrollLeft)
  };

  // direction : phương hướng
  const scroll = (direction)=> {
    const scrollAmount = 450; // số px cuộn sẵn
    if(direction == "prev"){
      listRef.current.scrollLeft -= scrollAmount

    }else {
      listRef.current.scrollLeft += scrollAmount
    }
  }
  return (
    <div className={cx("cards-row", "wide", "mt26")}>
      <div className={cx("row-header h2")} >
        <h2 style={{fontSize:"21px"}}>Phim có thể bạn thích?</h2>
      </div>

      <div ref={listRef} onWheel={handleWheel} className={cx("list-cast")}>
        {movies.map((item, index) => (
          <Link
            key={index}
            to={`/phim/${item.slug}`}
            className={cx("row-recom")}
          >
            <div className={cx("i")}>
              <img src={imageBase + item.thumb_url} alt={item.name} />
              <div className={cx("t-title")}>
                <div className={cx("t-left")}>
                  <p>{item.lang}</p>
                </div>
                <div className={cx("t-right")}>
                  <p> {item.quality}</p>
                </div>
              </div>
              <div to={""} className={cx("button-play")}>
                <div>
                  <FontAwesomeIcon className={cx("icon-play")} icon={faPlay} />
                </div>
              </div>
            </div>

            <div className={cx("cast-name")}>
              <h4>{item.name}</h4>
              <p>{item.origin_name}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className={cx("sw-nav")}>
        <button   onClick = {()=> scroll('prev')} className={cx("sw-n")}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button onClick = { ()=> scroll('next')} className={cx("sw-p")}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}

export default RecommendedMovies;
