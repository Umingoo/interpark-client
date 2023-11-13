/* eslint-disable jsx-a11y/anchor-is-valid */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "../styles/tour.css";
import "../styles/common.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Tour() {
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const swiperRef = useRef();

  const [htmlTag, setHtmlTag] = useState([]);

  const axiosJsonData = () => {
    axios
      .get(
        "https://port-0-interpark-server-1igmo82clopix4n6.sel5.cloudtype.app/tour"
      )
      .then(function (res) {
        let arr = [];
        for (let i = 0; i < res.data.total; i++) {
          const obj = res.data["tour_" + (i + 1)];
          arr[i] = obj;
        }
        setHtmlTag(arr);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  useEffect(() => {
    axiosJsonData();
  }, []);

  return (
    <section className="tour">
      <div className="tour-inner">
        <div className="tour-header">
          <h2 className="tour-title">투어 특가</h2>
          <span className="tour-txt">해외여행은 인터파크다</span>
        </div>
        <div className="tour-main">
          <div className="tour-cate">
            <ul className="tour-list">
              <li>
                <button className="cate-bt cate-bt-active">
                  망설이면 품절
                </button>
              </li>
              <li>
                <button className="cate-bt">패키지</button>
              </li>
              <li>
                <button className="cate-bt">국내숙소</button>
              </li>
              <li>
                <button className="cate-bt">해외숙소</button>
              </li>
            </ul>
          </div>
          <div className="tour-slide-wrap">
            <Swiper
              slidesPerView={3}
              spaceBetween={26}
              slidesPerGroup={3}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".tour-slide-wrap .slide-next-bt",
                prevEl: ".tour-slide-wrap .slide-prev-bt",
              }}
              className="tour-slide"
            >
              {htmlTag.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="swiper-slide">
                      <div className="tour-slide-item">
                        <a href={item.url} className="tour-link">
                          <div className="tour-img">
                            <img src={item.image} alt={item.place} />
                          </div>
                          <div className="tour-info">
                            <ul className="tour-good-list">
                              <li>
                                <span className="tour-good-info-desc">
                                  <em>{item.title}</em>
                                  <p>{item.place}</p>
                                  <b>{numberWithCommas(item.price)}</b>
                                  원~
                                </span>
                              </li>
                            </ul>
                          </div>
                          <button className="tour-plus">{item.event}</button>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {/* <!-- 좌, 우 버튼 --> */}
            <button className="slide-prev-bt">
              <img src="images/slider_arrow.svg" alt="" />
            </button>
            <button className="slide-next-bt">
              <img src="images/slider_arrow.svg" alt="" />
            </button>
          </div>
        </div>
        <div className="footer-link">
          <a href="#" className="link-bt">
            <span> 투어 홈 바로가기 </span>
            <img src="images/icon_arrow.svg" alt="" />
          </a>
        </div>
      </div>
    </section>
  );
}
export default Tour;
