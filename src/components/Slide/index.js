import {
  faCircleInfo,
  faHeart,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Slide.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from 'classnames/bind'

function Slide() {
  const cx = classNames.bind(styles)
  return (
    <>
      <div className={cx('top-slide')}>
        <div className="slide-wrapper">
          <img
            className={cx("img-mask")}
            src="https://static.nutscdn.com/vimg/1920-0/0ad186e9bbf32f86a48e84a6fbaa94a3.jpg"
            alt=""
          />
        </div>

        <div className={cx("safe-area")}>
          <div className={cx("slide-content")}>
            <div className={cx("media-item")}>
              <div className={cx("media-title-image")}>
                <a href="">
                  <img
                    alt="Zombie Cưng Của Ba"
                    src="https://static.nutscdn.com/vimg/0-260/96a1c67897c251c491bd5bb36b7bbb74.png"
                  ></img>
                </a>
              </div>
              <h3 className={cx("media-title")}></h3>
              <h3 className={cx("title-alias-title")}>
                <a href="">My Daughter is a Zombie</a>
              </h3>
              <div className={cx("hl-tags")}>
                <div className={cx("tag-model")}>
                  <span>
                    <strong>T13</strong>
                  </span>
                </div>
                <div className={cx("tag-classic")}>
                  <span>2025</span>
                </div>
                <div className={cx("tag-classic")}>
                  <span>1h 54m</span>
                </div>
              </div>
              <div className={cx("hl-tags mb-4")}>
                <a className={cx("tag-topic")} href="">
                  Chính kịch
                </a>
                <a className={cx("tag-topic")} href="">
                  Hài
                </a>
              </div>
              <div className={cx("description")}>
                Cho Jung Seok hóa thân thành Lee Jung Hwan, một huấn luyện viên
                động vật đầy nhiệt huyết quyết tâm bảo vệ cô con gái tuổi teen
                bị nhiễm virus zombie bằng cách “thuần hóa” cô bé.
              </div>
              <div className={cx("touch")}>
                <a href="" className={cx("button-play")}>
                  <div>
                    <FontAwesomeIcon className={cx("icon-play")} icon={faPlay} />
                  </div>
                </a>

                {/* Nhóm nút để tương tác */}
                <div className={cx("touch-group")}>
                  <a href="" className={cx("item")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </a>
                  <a href="" className={cx("item")}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </a>
                </div>
              </div>
            </div>
            <div className={cx("swiper")}>
              <div className={cx("swiper-wrapper")}>
                <div className={cx("swiper-slide")}>
                  <img
                    alt="Xem Phim"
                    loading="lazy"
                    src="https://static.nutscdn.com/vimg/150-0/c986724f99e98514a32f70cecd1cb173.webp"
                  ></img>
                </div>
                <div className={cx("swiper-slide")}>
                  <img
                    alt="Xem Phim"
                    loading="lazy"
                    src="https://static.nutscdn.com/vimg/150-0/c986724f99e98514a32f70cecd1cb173.webp"
                  ></img>
                </div>
                <div className={cx("swiper-slide")}>
                  <img
                    alt="Xem Phim"
                    loading="lazy"
                    src="https://static.nutscdn.com/vimg/150-0/c986724f99e98514a32f70cecd1cb173.webp"
                  ></img>
                </div>
                <div className={cx("swiper-slide")}>
                  <img
                    alt="Xem Phim"
                    loading="lazy"
                    src="https://static.nutscdn.com/vimg/150-0/c986724f99e98514a32f70cecd1cb173.webp"
                  ></img>
                </div>
                <div className={cx("swiper-slide")}>
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
