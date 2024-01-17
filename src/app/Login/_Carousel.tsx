"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.scss";

export default function CarouselLogin() {
  return (
    <Carousel
      autoPlay
      interval={6000}
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
