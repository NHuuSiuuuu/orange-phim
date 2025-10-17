import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PageMovieDetail() {
  const params = useParams();
  // List phim từ API
  const [movie, setMovie] = useState(null);
  
  // List phim cùng 1 server
  const [currentEpisodes, setCurrentEpisodes] = useState([]);

  // Server hiện tại
  const [currentServer, setCurrentServer] = useState(0);

  useEffect(() => {
    fetch(`https://ophim1.com/v1/api/phim/${params.slug}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("Kết quả API phim:", res);
        const data = res.data.item;
        setMovie(data);

        //Lấy list phim theo server và Nếu phim có tập, chọn tập đầu tiên làm mặc định
        // Nếu là phim bộ thì episodes là mảng và phần tử mảng > 0
        // Nếu thằng server nó là mảng và độ dài > 0 thì lấy thằng đầu tiên

        // if (
        //   Array.isArray(data.episodes) &&
        //   data.episodes.length > 0 &&
        //   Array.isArray(data.episodes[0].server_data) &&
        //   data.episodes[0].server_data.length > 0
        // ) {
        //   // Phim bộ hay phim lẻ cũng luôn lấy tập đầu tiên / link đầu tiên
        //   setCurrentEpisodes(data.episodes[0].server_data[0]);
        // }
        if (
          data.episodes?.length > 0 &&
          data.episodes[0].server_data?.length > 0
        ) {
          setCurrentEpisodes(data.episodes[0].server_data[0]);
        }
      });
  }, [params.slug]);
  console.log("currentEpisodes: ", currentEpisodes);
  console.log(movie);

  console.log('currentEpisodes',currentEpisodes)

  const imageBase = "https://img.ophim.live/uploads/movies/";

  const handleClickServer = (server, index) => {
    setCurrentServer(index);
    console.log(server);

    // Luôn lấy tập đầu tiên cảu server đó
    if (server.server_data?.length > 0) {
      setCurrentEpisodes(server.server_data[0]);
    }
  };

  if (!movie) return <p>Đang tải phim...</p>;
  return (
    <div style={{padding: 50}}>
      <h2>Phim: {movie.name}</h2>
      <h3>Thể loại: {movie.category.map((item) => item.name).join(", ")}</h3>
      <img src={imageBase + movie.thumb_url} alt={movie.name} width="250" />
      <br />
      {currentEpisodes.link_embed ? (
        <>
          <iframe src={currentEpisodes.link_embed} frameborder="0"></iframe>

          <br />
          {movie.episodes.map((server, index) => (
            <button
              key={index}
              onClick={() => handleClickServer(server, index)}
            >
              {server.server_name}
            </button>
          ))}

          <h3>Danh sách các tập phim</h3>
          {
            movie.episodes[currentServer].server_data.map((ep, idx) => (
              <ul>
                <li>
                <button
                onClick = {()=> setCurrentEpisodes(ep)}
                
                >{ep.name}</button>

                </li>
              </ul>
            ))
          }
        </>
      ) : (
        <h3>ĐÉo có link</h3>
      )}
    </div>
  );
}

export default PageMovieDetail;
