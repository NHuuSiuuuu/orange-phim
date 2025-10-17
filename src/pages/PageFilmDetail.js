import { useParams } from "react-router-dom";

function PageFilmDetail() {
    const params = useParams()
      useEffect(() => {
        fetch(`https://ophim1.com/v1/api/quoc-gia/${params.slug}`)
          .then((res) => res.json())
          .then((res) => setPost(res.data.items));
      }, []);
      console.log(post);
    return ( 
        <>
        <h3>Phim: </h3>
        
        </>
     );
}

export default PageFilmDetail;