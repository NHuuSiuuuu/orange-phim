import {
  faCircleInfo,
  faHeart,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import "./Slide.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Slide() {
  return (
    <>
      <div className="top-slide">
        <div className="slide-wrapper">
          <img
            className="img-mask"
            src="https://static.nutscdn.com/vimg/1920-0/0ad186e9bbf32f86a48e84a6fbaa94a3.jpg"
            alt=""
          />
        </div>

        <div className="safe-area">
          <div className="slide-content">
            <div className="media-item">
              <div className="media-title-image">
                <a href="">
                  <img
                    alt="Zombie Cưng Của Ba"
                    src="https://static.nutscdn.com/vimg/0-260/96a1c67897c251c491bd5bb36b7bbb74.png"
                  ></img>
                </a>
              </div>
              <h3 className="media-title"></h3>
              <h3 className="title-alias-title">
                <a href="">My Daughter is a Zombie</a>
              </h3>
              <div className="hl-tags">
                <div className="tag-model">
                  <span>
                    <strong>T13</strong>
                  </span>
                </div>
                <div className="tag-classic">
                  <span>2025</span>
                </div>
                <div className="tag-classic">
                  <span>1h 54m</span>
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
              <div className="description">
                Cho Jung Seok hóa thân thành Lee Jung Hwan, một huấn luyện viên
                động vật đầy nhiệt huyết quyết tâm bảo vệ cô con gái tuổi teen
                bị nhiễm virus zombie bằng cách “thuần hóa” cô bé.
              </div>
              <div className="touch">
                <a href="" className="button-play">
                  <div>
                    <FontAwesomeIcon className="icon-play" icon={faPlay} />
                  </div>
                </a>

                {/* Nhóm nút để tương tác */}
                <div className="touch-group">
                  <a href="" className="item">
                    <FontAwesomeIcon icon={faHeart} />
                  </a>
                  <a href="" className="item">
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </a>
                </div>
              </div>
            </div>
            <div className="swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img
                    alt="Xem Phim"
                    loading="lazy"
                    src="https://static.nutscdn.com/vimg/150-0/c986724f99e98514a32f70cecd1cb173.webp"
                  ></img>
                </div>
                <div className="swiper-slide">
                  <img
                    alt="Xem Phim"
                    loading="lazy"
                    src="https://static.nutscdn.com/vimg/150-0/c986724f99e98514a32f70cecd1cb173.webp"
                  ></img>
                </div>
                <div className="swiper-slide">
                  <img
                    alt="Xem Phim"
                    loading="lazy"
                    src="https://static.nutscdn.com/vimg/150-0/c986724f99e98514a32f70cecd1cb173.webp"
                  ></img>
                </div>
                <div className="swiper-slide">
                  <img
                    alt="Xem Phim"
                    loading="lazy"
                    src="https://static.nutscdn.com/vimg/150-0/c986724f99e98514a32f70cecd1cb173.webp"
                  ></img>
                </div>
                <div className="swiper-slide">
                  <img
                    alt="Xem Phim"
                    loading="lazy"
                    src="https://static.nutscdn.com/vimg/150-0/c986724f99e98514a32f70cecd1cb173.webp"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slide;
