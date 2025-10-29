import loadingIcon from "~/assets/img/loading.png";
// import loadingIcon from '~/assets/img/loading.png'
import './LoadindIcon.scss'
function LoadingIcon() {
  return (
    <div className="loading-screen">
                <img src={loadingIcon} alt="Loading..." className="loading-icon" />

    </div>
  );
}

export default LoadingIcon;
