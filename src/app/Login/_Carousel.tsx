"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import Image from "next/image";
import { useContext, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.scss";

export default function CarouselLogin() {
  const [isHovered, setIsHovered] = useState(false);
  const ContextHub = useContext(UseContextHook);
  const { auth } = ContextHub;
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  if (auth) {
    return null;
  }
  return (
    <Carousel
      autoPlay={!isHovered}
      interval={3000}
      transitionTime={1500}
      infiniteLoop
      className="login-img-div"
      showThumbs={false}
    >
      <div className="caroselImg">
        <Image
          src="/images/prosollogin1.png"
          /*  loading="lazy" */
          alt="loding view"
          // sizes="50vw"
          fill
          // style={{
          //   objectFit: "fill", // cover, contain, none
          // }}
        />
      </div>
      <div className="caroselImg">
        <Image
          src="/images/prosollogin2.png"
          /* loading="lazy" */
          alt="loding view"
          // sizes="50vw"
          fill
          // style={{
          //   objectFit: "fill", // cover, contain, none
          // }}
        />
      </div>
    </Carousel>
  );
}
