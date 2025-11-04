import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.scss'
import logo from '~/assets/img/logo.png'
import { faFacebook, faInstagram, faSquareInstagram, faTelegram, faTelegramPlane, faThreads, faTiktok, faXTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className="container">
      <div className="footer-elements">
        <div className="silde-left">
            <div className="true">
              <div className="line-center">
                <div className="icon">
                  <img src="https://www.rophim.mx/images/vn_flag.svg" alt="" />
                </div>

                <span>Hoàng Sa & Trường Sa là của Việt Nam!</span>
              </div>

            </div>

            <div className="brand">
              <a href="/">
                <img src={logo} alt="" />
              </a>

            </div>
            <div className="socials">
              <a href="https://www.facebook.com/mohamedsatiii" className="social-item">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://www.instagram.com/mohamed_sati________/" className="social-item">
                <FontAwesomeIcon icon={faInstagram} />

              </a>
              
              <a href="/" className="social-item">
                <FontAwesomeIcon icon={faXTwitter} />

              </a>
              <a href="/" className="social-item">
                <FontAwesomeIcon icon={faTiktok} />

              </a><a href="/" className="social-item">
                <FontAwesomeIcon icon={faThreads} />

              </a><a href="/" className="social-item">
                <FontAwesomeIcon icon={faTelegram} />

              </a>

            </div>


            <div className="note">
              OrangePhim – Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá nền tảng phim trực tuyến hay nhất 2025 chất lượng 4K!
            </div>


        </div>
      </div>
    </div>
  );
}

export default Footer;
