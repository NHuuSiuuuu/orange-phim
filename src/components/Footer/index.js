import './Footer.scss'
import logo from '~/assets/img/logo.png'

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

            <div className="note">
              OrangePhim – Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá nền tảng phim trực tuyến hay nhất 2025 chất lượng 4K!
            </div>


        </div>
      </div>
    </div>
  );
}

export default Footer;
