import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilm } from "~/services";
import "./PageFilmView.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck, faChevronCircleLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CastList from "~/components/CastList";

// Lần đầu render ra movie là null
// Sau khi chạy api xong nó mới có dữ liệu

function PageFilmView() {
  // List phim từ API
  const [movie, setMovie] = useState(null);

  // List phim cùng 1 server
  const [currentEpisodes, setCurrentEpisodes] = useState([]);

  // server của phim hiện tại
  const [currentServer, setCurrentServer] = useState(0);
  
  // Params 
  const params = useParams();
  // console.log(params.slug)

  // Loại phim
  const [typeFilms, setTypeFilms] = useState([]);

  // Check pphim hoàn thành chưa
  const [check, setCheck] = useState();

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
  // console.log(check);

  const handleServer = (sv, idx) => {
    setCurrentServer(idx);

    // Luôn chọn tập đầu tiên (Nếu là mảng thì chọn thằng đầu tiên)
    if (Array.isArray(sv.server_data) && sv.server_data[0]) {
      setCurrentEpisodes(sv.server_data[0]);
    }

    // console.log("Server: ", sv);
  };
  if (!movie) return <h3>Đang tải phim ...</h3>;
  // console.log(movie.item.episode_current);
  // console.log();
  //   console.log(movie.data.item)

  return (
    <div className="wrapper">
      <div className="watch-player">
        <div className="title">
          <a href="/"><FontAwesomeIcon icon={faChevronCircleLeft} /></a>
          <h2>{movie.item.name}</h2>
        </div>
        <div className="player-ratio">
          <iframe src={currentEpisodes.link_embed} allowFullScreen></iframe>
        </div>
      </div>

      <div className="watch-container">
        <div className="wm-info">
          <div className="thumb">
            <img src={imageBase + movie.item.thumb_url} alt="" />
          </div>
          <div className="info">
            <h2>
              <a href="">{movie.item.name}</a>
            </h2>
            <div className="alias-name">{movie.item.origin_name}</div>
            <div className="detail-more">
              <div className="hl-tags">
                <div className="tag-model">
                  <span>
                    <strong>T13</strong>
                  </span>
                </div>
                <div className="tag-classic">
                  <span>{movie.item.year}</span>
                </div>
                <div className="tag-classic">
                  <span>{movie.item.time}</span>
                </div>
              </div>

              <div className="hl-tags mb-4">
                {typeFilms.map((type, index) => (
                  <Link to={type.slug} key={index}  className="tag-topic ">
                    {type?.name}
                  </Link>
                ))}
              </div>

              <div className="status on-going">
                {check == "completed" ? (
                  <FontAwesomeIcon className="icon" icon={faCheck} />
                ) : (
                  <div className="loading-d active">
                    <FontAwesomeIcon icon={faSpinner} />
                  </div>
                )}

                <div className="mr">
                  <span>
                    {(check == "ongoing" || check == "updating") &&
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

        <div className="desc-line">
          <p dangerouslySetInnerHTML={{ __html: movie.item.content }} />
        </div>

        {/* Danh sách các tập */}
        <div className="episodes-list">
          <div className="server-list">
            <div className="hl-tags mb-4">
              {movie.item.episodes.map((sv, idx) => (
                <button
                
                  className="tag-topic"
                  onClick={() => handleServer(sv, idx)}
                  key={idx}
                >
                  {sv.server_name}
                </button>
              ))}
            </div>
          </div>

          <div className="eps">
            <div className="hl-tags">
              {movie.item.episodes[currentServer].server_data.map(
                (item, index) => (
                  <div className="tag-model" key={index}>
                    <button
                      className="tag-topic"
                      onClick={() => setCurrentEpisodes(item)}
                      style={{ color: "#000",width: '50px' }}
                    >
                      Tập {index + 1}
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Danh sách diễn viên */}
        <CastList slug={params.slug} />
      </div>
    </div>
    
  );
}

export default PageFilmView;
