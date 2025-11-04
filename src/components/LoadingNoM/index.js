import loadingnomovies from "~/assets/img/loadingnomovies.png";

function LoadingNoM() {
  return (
    <div className="">
      <img src={loadingnomovies} alt="Loading..." className="loadingicon" />
    </div>
  );
}

export default LoadingNoM;
