import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getFilmsByCountry } from "~/services";

function PageDetail() {
  const params = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getFilmsByCountry(params.slug)
      setPost(result.items)
    }
    // fetch(`https://ophim1.com/v1/api/quoc-gia/${params.slug}`)
    //   .then((res) => res.json())
    //   .then((res) => setPost(res.data.items));
    fetchApi();
  }, []);
  console.log(post);

  return (
    <>
      {
        <ul>
          {post &&
            post.map((film) => (
              <>
                {/* <h3>Danh sách phim nước: {film.name}</h3> */}
                <li key={film._id}>
                  <Link to={"/phim/" + film.slug } >{film.name}</Link>
                </li>
              </>
            ))}
        </ul>
      }
    </>
  );
}
export default PageDetail;
