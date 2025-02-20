"use client";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import Image from "next/image";

const images = [
  {
    src: "/imageone.png",
    text: "Client 1",
    location: "Dubai, United Arab Emirates",
  },
  {
    src: "/imagetwo.png",
    text: "Client 2",
    location: "Dubai, United Arab Emirates",
  },
  {
    src: "/imageone.png",
    text: "Client 3",
    location: "Abu Dhabi, United Arab Emirates",
  },
  {
    src: "/imagetwo.png",
    text: "Client 4",
    location: "Sharjah, United Arab Emirates",
  },
  {
    src: "/imagethree.png",
    text: "Client 5",
    location: "Sharjah, United Arab Emirates",
  },
];

export default function QualityProducts() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const imagesLength = images.length;
  const [isMobile, setIsMobile] = useState(false);
  const slidesPerView = isMobile ? 1.5 : 2.5;
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateCenterIndex = () => {
    let centerIndex;
    if (imagesLength <= slidesPerView) {
      centerIndex = Math.floor(imagesLength / 2);
    } else {
      centerIndex = Math.floor(activeIndex + slidesPerView / 2);
      if (centerIndex >= imagesLength) {
        centerIndex = imagesLength - 1;
      }
    }
    return centerIndex;
  };

  const centerIndex = calculateCenterIndex();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div ref={sectionRef}  className="flex flex-col items-center py-[82px] md:py-40">
     <motion.h2
        className="md:text-xl text-[30px] text-black font-normal mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Quality Products
      </motion.h2>

      {/* Animated Paragraph */}
      <motion.p
        className="text-center max-w-lg text-[#7A7777] mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        Lorem ipsum dolor sit amet, <br className="block md:hidden" />{" "}
        consectetur adipiscing elit, sed do <br className="block md:hidden" />{" "}
        eiusmod tempor incididunt ut labore et{" "}
        <br className="block md:hidden" /> dolore magna aliqua. Ut enim ad minim{" "}
        <br className="block md:hidden" />
        veniam, quis nostrud exercitation <br className="block md:hidden" />{" "}
        ullamco laboris nisi ut aliquip ex ea <br className="block md:hidden" />
        commodo consequat.
      </motion.p>

      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={isMobile ? 40 : 20}
        loop={false}
        initialSlide={1}
        centeredSlidesBounds={true}
        slideToClickedSlide={true}
        speed={500}
        centeredSlides={isMobile ? true : false}
        className="w-full relative "
        onSlideChange={(swiper) => {
          const newActiveIndex = swiper.realIndex;
          setActiveIndex(newActiveIndex);
          setHoveredIndex(null);
        }}
      >
        {images.map((image, index) => {
          let rotation = 0;

          if (index === centerIndex - 1) {
            rotation = -10;
          } else if (index === centerIndex + 1) {
            rotation = 10;
          }

          return (
            <SwiperSlide
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="overflow-hidden rounded-lg"
                initial={{ rotate: 0 }}
                animate={{ rotate: rotation }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={image.src}
                  alt="slide"
                  className="object-cover rounded-lg transition-transform duration-300 md:w-[434px] md:h-[619px]   "
                  width={isMobile ? 232 : 434}
                  height={isMobile ? 331 : 619}
                />
              </motion.div>

              {index === centerIndex && (
                <motion.div
                  className="flex flex-col items-center justify-center mt-10 md:mt-12 w-full md:w-[434px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeIn" }}
                  key={image.text}
                >
                  <h3 className="md:text-lg text-md text-black font-normal">
                    {image.text}
                  </h3>
                  <p className="md:text-[24px] mt-3 text-[16px] text-[#7A7777] font-light">
                    {image.location}
                  </p>
                </motion.div>
              )}
              {console.log(centerIndex, "centerIndex")}
              {index === centerIndex && hoveredIndex === centerIndex && (
                <div
                  className="absolute bg-white  rounded-full top-[270px] left-[170px] w-[99px] h-[99px] md:flex hidden items-center justify-center text-black text-[20px] cursor-pointer transition duration-300 ease-in-out"
                  style={{ opacity: hoveredIndex === centerIndex ? 1 : 0 }}
                >
                  {" "}
                  Drag
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
