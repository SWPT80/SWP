import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/responsive.css';
import '../assets/styles/Footer.css';
import { Alert } from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import footerBlog1 from '../assets/images/footer_blog_1.jpg';
import footerBlog2 from '../assets/images/footer_blog_2.jpg';
import footerBlog3 from '../assets/images/footer_blog_3.jpg';
import placeholderSvg from '../assets/images/placeholder.svg';
import phoneCallSvg from '../assets/images/phone-call.svg';
import messageSvg from '../assets/images/message.svg';
import planetEarthSvg from '../assets/images/planet-earth.svg';

const Footer = () => {
  const [error, setError] = useState('');

  // Kiểm tra dữ liệu footer (giả sử cần kiểm tra tài nguyên hình ảnh)
  useEffect(() => {
    const images = [logo, footerBlog1, footerBlog2, footerBlog3, placeholderSvg, phoneCallSvg, messageSvg, planetEarthSvg];
    const isValid = images.every(img => img);
    if (!isValid) {
      setError('Không thể tải một số tài nguyên footer.');
    } else {
      setError('');
    }
  }, []);

  return (
    <div>
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 footer_column">
              <div className="footer_col">
                <div className="footer_content footer_about">
                  <div className="logo_container footer_logo">
                    <div className="logo"><a href="#"><img src={logo} alt="TraExCo Logo" />TraExCo</a></div>
                  </div>
                  <p className="footer_about_text">
                    TraExCo mang đến trải nghiệm du lịch độc đáo với các homestay, dịch vụ và trải nghiệm tuyệt vời tại Việt Nam. Hãy tham gia để khám phá và tận hưởng!
                  </p>
                  <ul className="footer_social_list">
                    <li className="footer_social_item"><a href="#"><i className="fa fa-pinterest"></i></a></li>
                    <li className="footer_social_item"><a href="#"><i className="fa fa-facebook-f"></i></a></li>
                    <li className="footer_social_item"><a href="#"><i className="fa fa-twitter"></i></a></li>
                    <li className="footer_social_item"><a href="#"><i className="fa fa-dribbble"></i></a></li>
                    <li className="footer_social_item"><a href="#"><i className="fa fa-behance"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 footer_column">
              <div className="footer_col">
                <div className="footer_title">Bài viết blog</div>
                <div className="footer_content footer_blog">
                  <div className="footer_blog_item clearfix">
                    <div className="footer_blog_image"><img src={footerBlog1} alt="Du lịch cùng chúng tôi" /></div>
                    <div className="footer_blog_content">
                      <div className="footer_blog_title"><a href="blog.html">Du lịch cùng chúng tôi năm nay</a></div>
                      <div className="footer_blog_date">29/11/2017</div>
                    </div>
                  </div>
                  <div className="footer_blog_item clearfix">
                    <div className="footer_blog_image"><img src={footerBlog2} alt="Điểm đến mới" /></div>
                    <div className="footer_blog_content">
                      <div className="footer_blog_title"><a href="blog.html">Điểm đến mới dành cho bạn</a></div>
                      <div className="footer_blog_date">29/11/2017</div>
                    </div>
                  </div>
                  <div className="footer_blog_item clearfix">
                    <div className="footer_blog_image"><img src={footerBlog3} alt="Du lịch cùng chúng tôi" /></div>
                    <div className="footer_blog_content">
                      <div className="footer_blog_title"><a href="blog.html">Du lịch cùng chúng tôi năm nay</a></div>
                      <div className="footer_blog_date">29/11/2017</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 footer_column">
              <div className="footer_col">
                <div className="footer_title">Thẻ</div>
                <div className="footer_content footer_tags">
                  <ul className="tags_list clearfix">
                    <li className="tag_item"><a href="#">thiết kế</a></li>
                    <li className="tag_item"><a href="#">thời trang</a></li>
                    <li className="tag_item"><a href="#">âm nhạc</a></li>
                    <li className="tag_item"><a href="#">video</a></li>
                    <li className="tag_item"><a href="#">tiệc tùng</a></li>
                    <li className="tag_item"><a href="#">nhiếp ảnh</a></li>
                    <li className="tag_item"><a href="#">phiêu lưu</a></li>
                    <li className="tag_item"><a href="#">du lịch</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 footer_column">
              <div className="footer_col">
                <div className="footer_title">Thông tin liên hệ</div>
                <div className="footer_content footer_contact">
                  <ul className="contact_info_list">
                    <li className="contact_info_item d-flex flex-row">
                      <div><div className="contact_info_icon"><img src={placeholderSvg} alt="Địa chỉ" /></div></div>
                      <div className="contact_info_text">4127 Raoul Wallenber 45b-c Gibraltar</div>
                    </li>
                    <li className="contact_info_item d-flex flex-row">
                      <div><div className="contact_info_icon"><img src={phoneCallSvg} alt="Số điện thoại" /></div></div>
                      <div className="contact_info_text">2556-808-8613</div>
                    </li>
                    <li className="contact_info_item d-flex flex-row">
                      <div><div className="contact_info_icon"><img src={messageSvg} alt="Email" /></div></div>
                      <div className="contact_info_text"><a href="mailto:contactme@gmail.com?Subject=Xin chào" target="_top">contactme@gmail.com</a></div>
                    </li>
                    <li className="contact_info_item d-flex flex-row">
                      <div><div className="contact_info_icon"><img src={planetEarthSvg} alt="Website" /></div></div>
                      <div className="contact_info_text"><a href="https://colorlib.com">www.colorlib.com</a></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;