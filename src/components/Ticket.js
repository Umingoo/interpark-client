import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/ticket.css";
import "../styles/common.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Ticket() {
  const swiperRef = useRef();
  const [htmlTag, setHtmlTag] = useState([]);

  const axiosJsonData = () => {
    axios
      .get("ticket.json")
      .then(function (res) {
        let arr = [];
        for (let i = 0; i < res.data.total; i++) {
          const obj = res.data["ticket_" + (i + 1)];
          arr[i] = obj;
        }
        setHtmlTag(arr);
      })
      .catch(function (error) {});
  };

  useEffect(() => {
    axiosJsonData();
  }, []);
  return (
    <section className="ticket">
      <div className="ticket-inner">
        <div className="ticket-header">
          <h2 className="ticket-title">티켓 랭킹</h2>
          <span className="ticket-txt">오늘 뭐볼까? 지금 HOT한 공연</span>
        </div>
        <div className="ticket-main">
          <div className="ticket-cate">
            <ul className="ticket-list">
              <li>
                <button className="cate-bt cate-bt-active">뮤지컬</button>
              </li>
              <li>
                <button className="cate-bt">콘서트</button>
              </li>
              <li>
                <button className="cate-bt">스포츠</button>
              </li>
              <li>
                <button className="cate-bt">전시/행사</button>
              </li>
              <li>
                <button className="cate-bt">클래식/무용</button>
              </li>
              <li>
                <button className="cate-bt">아동/가족</button>
              </li>
              <li>
                <button className="cate-bt">연극</button>
              </li>
              <li>
                <button className="cate-bt">레저/캠핑</button>
              </li>
            </ul>
          </div>
          <div className="ticket-slide-wrap">
            <Swiper
              slidesPerView={4}
              spaceBetween={28}
              slidesPerGroup={4}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".ticket-slide-wrap .slide-next-bt",
                prevEl: ".ticket-slide-wrap .slide-prev-bt",
              }}
              className="ticket-slide"
            >
              {htmlTag.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div class="swiper-slide">
                      <div class="ticket-slide-item">
                        <a href={item.url} class="ticket-link">
                          <div class="ticket-img">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <div>
                            <span class="rank">{item.rank}</span>
                          </div>
                          <div class="ticket-info">
                            <ul class="ticket-good-list">
                              <li>
                                <span class="ticket-info-desc">
                                  {item.title}
                                  <b>{item.place}</b>
                                  <p>{item.date}</p>
                                </span>
                              </li>
                              <li>
                                <p class="ticket-seat">{item.option}</p>
                              </li>
                            </ul>
                          </div>
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
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
            <span> 티켓 홈 바로가기 </span>
            <img src="images/icon_arrow.svg" alt="" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Ticket;
