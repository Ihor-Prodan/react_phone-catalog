import React, { useRef, useState } from 'react';
import styles from './banner.module.scss';
import Banner from './Pictures/banner1.jpeg';
import Banner2 from './Pictures/slide1.png';
import Banner3 from './Pictures/banner3.jpeg';
import sliderButton from './Pictures/sliderButton.png';
import 'swiper/css';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';

export const Baner: React.FC = () => {
  const banners = [Banner, Banner2, Banner3];
  const swiperRef = useRef<Swiper | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const nextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const prevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setActiveSlideIndex(swiperRef.current.realIndex);
    }
  };

  setInterval(() => {
    nextSlide();
  }, 8000);

  return (
    <>
      <div className={styles.bannerWraper}>
        <section className={styles.sectionBanner}>
          <button className={styles.bannerButtons} onClick={prevSlide}>
            <img
              className={styles.sliderArrowLeft}
              src={sliderButton}
              alt="Previous"
            />
          </button>
          <div className={styles.bannerContent}>
            <ReactSwiper
              className={styles.bannerImgSwiper}
              spaceBetween={10}
              slidesPerView={1}
              speed={800}
              loop={true}
              onSwiper={swiper => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
            >
              {banners.map((banner, index) => (
                <SwiperSlide key={index} className={styles.swiperSlide}>
                  <img
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    className={styles.bannerImg}
                  />
                </SwiperSlide>
              ))}
            </ReactSwiper>
            <svg
              className={styles.bannerDotters}
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="24"
              viewBox="0 0 80 24"
              fill="none"
            >
              {banners.map((_banner, index) => (
                <rect
                  key={index}
                  x={5 + index * 28}
                  y="10"
                  width="14"
                  height="4"
                  fill={index === activeSlideIndex ? '#000' : '#E2E6E9'}
                  onClick={() => {
                    setActiveSlideIndex(index);
                    swiperRef.current?.slideTo(index);
                  }}
                />
              ))}
            </svg>
          </div>
          <button className={styles.bannerButtons} onClick={nextSlide}>
            <img
              className={styles.sliderArrowRight}
              src={sliderButton}
              alt="Next"
            />
          </button>
        </section>
      </div>
    </>
  );
};

export default Baner;