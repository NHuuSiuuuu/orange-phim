import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilm } from "~/services";

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
    setCurrentServer(idx)

    // Luôn chọn tập đầu tiên (Nếu là mảng thì chọn thằng đầu tiên)
    if(Array.isArray(sv.server_data) && sv.server_data[0]){
        setCurrentEpisodes(sv.server_data[0])
    }

    console.log('Server: ',sv)

  }
  if (!movie) return <h3>Đang tải phim ...</h3>;
  console.log(currentServer);
//   console.log(movie.data.item)

  return (
    <div style={{ color: "red" }} className="">
      <h2>Phim</h2>
      <h3>Thể loại</h3>
      <img src={imageBase + movie.item.thumb_url} alt="" />
      <iframe src={currentEpisodes.link_embed} frameborder="0"  width={1000} height={500}></iframe>
      <h4>Server</h4>
      {movie.item.episodes.map((sv, idx) => (
        <button onClick={()=>handleServer(sv, idx)} key={idx}>{sv.server_name}</button>
      ))}
      <h4>Danh sách các tập</h4>
      <ul>

      {
          movie.item.episodes[currentServer].server_data.map((item, index)=>(
              <li onClick = {()=>{setCurrentEpisodes(item)}}><button>{index + 1}</button></li>
            ))
        }
        </ul>

    </div>
  );
}

export default PageFilmView;
