"use client";

import { UseContextHook } from "@/Provides/UseContextHook";
import Image from "next/image";
import { useContext } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CarouselLogin() {
  const images = [
    "/images/Login/prosolloginone.svg",
    "/images/Login/prosollogintwo.svg",
  ];
  const ContextHub = useContext(UseContextHook);
  const { auth } = ContextHub;

  if (auth) {
    return null;
  }
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]} // Include modules here
      slidesPerView={1}
      loop={true}
      speed={2000}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      className="login-img-div"
      // navigation={true}
      // pagination={{ clickable: true }}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <div className="caroselImg">
            <Image
              src={src}
              alt="loding view"
              priority={true}
              fill
              style={{
                objectFit: "cover",
                width: "100%",
              }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
