import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilm } from "~/services";
import "./PageFilmView.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// Lần đầu render ra movie là null
// Sau khi chạy api xong nó mới có dữ liệu

function PageFilmView() {
  // List phim từ API
  const [movie, setMovie] = useState(null);

  // List phim cùng 1 server
  const [currentEpisodes, setCurrentEpisodes] = useState([]);

  // server của phim hiện tại
  const [currentServer, setCurrentServer] = useState(0);
  const params = useParams();

  const imageBase = "https://img.ophim.live/uploads/movies/";

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFilm(params.slug);
      setMovie(data);
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

  const handleServer = (sv, idx) => {
    setCurrentServer(idx);

    // Luôn chọn tập đầu tiên (Nếu là mảng thì chọn thằng đầu tiên)
    if (Array.isArray(sv.server_data) && sv.server_data[0]) {
      setCurrentEpisodes(sv.server_data[0]);
    }

    console.log("Server: ", sv);
  };
  if (!movie) return <h3>Đang tải phim ...</h3>;
  console.log(movie);
  console.log();
  //   console.log(movie.data.item)

  return (
    <div className="wrapper">
      <div className="watch-player">
        <div className="title">
          <a href="/">Back</a>
          <h2>{movie.item.name}</h2>
        </div>
        <div className="player-ratio">
          <iframe
            src={currentEpisodes.link_embed}
            frameborder="0"
            allowFullScreen
          ></iframe>
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
                <a className="tag-topic" href="">
                  Chính kịch
                </a>
                <a className="tag-topic" href="">
                  Hài
                </a>
              </div>

              <div className="status on-going">
                <div className="loading-d active">
                  <FontAwesomeIcon icon={faSpinner} />
                </div>

                <div>
                  <span>Đã chiếu: {movie.item.episode_current} Tập</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="desc-line">
          <div dangerouslySetInnerHTML={{ __html: movie.item.content }} />
        </div>

        <div className="episodes-list">
          <div className="server-list">
            <div className="hl-tags mb-4">
              {movie.item.episodes.map((sv, idx) => (
                <button className="tag-topic" href="" key={idx}>
                  {sv.server_name}
                </button>
              ))}
            </div>
          </div>

          <div className="eps">
            {" "}
            <div className="hl-tags">
              {movie.item.episodes[currentServer].server_data.map(
                (item, index) => (
                  <div className="tag-model" key={index}>
                    <button className="tag-topic" onClick={()=> setCurrentEpisodes(item)} style={{ color: "#000" }}>
                      Tập {index + 1}
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div style={{ color: "red" }} className="">
    //   <h2>Phim</h2>
    //   <h3>Thể loại</h3>
    //   <img src={imageBase + movie.item.thumb_url} alt="" />
    //   <iframe src={currentEpisodes.link_embed} frameborder="0"  width={1000} height={500}></iframe>
    //   <h4>Server</h4>
    //   {movie.item.episodes.map((sv, idx) => (
    //     <button onClick={()=>handleServer(sv, idx)} key={idx}>{sv.server_name}</button>
    //   ))}
    //   <h4>Danh sách các tập</h4>
    //   <ul>

    //   {
    //       movie.item.episodes[currentServer].server_data.map((item, index)=>(
    //           <li onClick = {()=>{setCurrentEpisodes(item)}}><button>{index + 1}</button></li>
    //         ))
    //     }
    //     </ul>

    // </div>
  );
}

export default PageFilmView;
