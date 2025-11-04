import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilm } from "~/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheck,
  faChevronCircleLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CastList from "~/components/CastList";
import { useNavigate } from "react-router-dom";
import RecommendedMovies from "~/components/RecommendedMovies";
import LoadingNoM from "~/components/LoadingNoM";
import classNames from "classnames/bind";
import styles from "./PageFilmView.module.scss";

// Lần đầu render ra movie là null
// Sau khi chạy api xong nó mới có dữ liệu

function PageFilmView() {
  const cx = classNames.bind(styles);
  // List phim từ API
  const [movie, setMovie] = useState(null);

  // List phim cùng 1 server
  const [currentEpisodes, setCurrentEpisodes] = useState([]);

  // server của phim hiện tại
  const [currentServer, setCurrentServer] = useState(0);

  // Params
  const params = useParams();
  console.log(params.slug);

  // Loại phim
  const [typeFilms, setTypeFilms] = useState([]);

  // Check pphim hoàn thành chưa
  const [check, setCheck] = useState();

  // Go back
  const nav = useNavigate();

  const handleGoBack = () => {
    nav(-1);
  };

  const imageBase = "https://img.ophim.live/uploads/movies/";

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFilm(params.slug);
      setMovie(data);
      setTypeFilms(data.breadCrumb);
      setCheck(data.item.status);

      //   console.log(data.item.episodes[0].server_data[0]);

      // Lấy server đầu tiên nếu có nhiều server ( là mảng && mảng > 0)
      // Lấy tập đầu tiên nếu có nhiều tập trong 1 server
      if (
        Array.isArray(data.item.episodes) &&
        data.item.episodes.length > 0 &&
        Array.isArray(data.item.episodes[0].server_data) &&
        data.item.episodes[0].server_data.length > 0
      ) {
        setCurrentEpisodes(data.item.episodes[0].server_data[0]);
      }
    };
    fetchData();
  }, [params.slug]);
  console.log(check);

  const handleServer = (sv, idx) => {
    setCurrentServer(idx);

    // Luôn chọn tập đầu tiên (Nếu là mảng thì chọn thằng đầu tiên)
    if (Array.isArray(sv.server_data) && sv.server_data[0]) {
      setCurrentEpisodes(sv.server_data[0]);
    }

    // console.log("Server: ", sv);
  };
  if (!movie) return <h3>Đang tải phim ...</h3>;
  console.log(currentEpisodes);
  // console.log();
  // console.log(movie.breadCrumb[0].slug)

  return (
    <div className={cx("wrapper page-film-view")}>
      <div className={cx("title")} onClick={handleGoBack}>
        <h2 style={{ fontSize: "20px", margin: "20px 0 20px 10px" }}>
          <FontAwesomeIcon icon={faChevronCircleLeft} />
          {movie.item.name}
        </h2>
      </div>
      <div className={cx("watch-player")}>
        <div className={cx("player-ratio")}>
          {currentEpisodes?.link_embed ? (
            <iframe
              src={currentEpisodes?.link_embed}
              title={movie?.item?.name || "player"}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              // allow="autoplay;clipboard-write; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <LoadingNoM />
          )}
        </div>
      </div>

      <div className={cx("watch-container")}>
        <div className={cx("wm-info")}>
          <div className={cx("thumb")}>
            <img src={imageBase + movie.item.thumb_url} alt="" />
          </div>
          <div className={cx("info")}>
            <h2 style={{ fontSize: "14px" }}>{movie.item.name}</h2>
            <div className={cx("alias-name")} style={{ fontSize: "14px" }}>
              {movie.item.origin_name}
            </div>
            <div className={cx("detail-more")}>
              <div className={cx("hl-tags")}>
                <div className={cx("tag-model")}>
                  <span>
                    <strong>T13</strong>
                  </span>
                </div>
                <div className={cx("tag-classic")}>
                  <span>{movie.item.year}</span>
                </div>
                <div className={cx("tag-classic")}>
                  <span>{movie.item.time}</span>
                </div>
              </div>

              <div className="hl-tags mb-4">
                {typeFilms.map((type, index) => (
                  <Link to={type.slug} key={index} className={cx("tag-topic ")}>
                    {type?.name}
                  </Link>
                ))}
              </div>

              <div
                className={cx("status")}
                style={{
                  color: "#fff",
                  fontSize: "11px",
                  gap: "2px",
                  marginTop: "0.6rem",
                }}
              >
                {check == "completed" ? (
                  <FontAwesomeIcon className={cx("icon")} icon={faCheck} />
                ) : (
                  <div className={cx("loading-d")}>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className={cx("custom-spin")}
                      spin
                    />{" "}
                    {/*Thêm thằng spin trong thư viện FontS là nó xoay trong 2s  */}
                  </div>
                )}

                <div className={cx("mr")}>
                  <span>
                    {(check === "ongoing" || check === "updating") &&
                      "Đang Chiếu "}
                    {movie.item.episode_current == "Full" ? (
                      "Full"
                    ) : (
                      <>
                        {movie.item.episode_current} /{" "}
                        {movie.item.episode_total}
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx("desc-line")}>
          <p
            style={{ fontSize: "10px" }}
            dangerouslySetInnerHTML={{ __html: movie.item.content }}
          />
        </div>

        {/* Danh sách các tập */}
        <div className={cx("episodes-list")}>
          <div className={cx("server-list")}>
            <div className={cx("hl-tags flex")}>
              {movie.item.episodes.map((sv, idx) => (
                <button
                  key={idx}
                  className={cx("tag-topic")}
                  onClick={() => handleServer(sv, idx)}
                  style={{fontSize:"9px"}}
                >
                  {sv.server_name}
                </button>
              ))}
            </div>
          </div>

          <div className={cx("eps")}>
            <div className={cx("eps_hl-tags")}>
              {movie.item.episodes[currentServer].server_data.map(
                (item, index) => (
                  <button
                    className={cx("eps_tag-topic")}
                    key={index}
                    onClick={() => setCurrentEpisodes(item)}
                  >
                    Tập {index + 1}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Danh sách diễn viên */}
        <CastList slug={params.slug} />

        <RecommendedMovies slug={movie.breadCrumb[0].slug} />
      </div>
    </div>
  );
}

export default PageFilmView;
