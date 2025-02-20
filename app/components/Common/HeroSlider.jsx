"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import SliderOne from "@/public/sliderone.png";
import SliderTwo from "@/public/slidertwo.jpg";
import SliderThree from "@/public/sliderthree.jpg";
import SliderFour from "@/public/sliderfour.jpg";

const slides = [SliderOne, SliderTwo, SliderThree, SliderFour];
const totalSlides = slides.length;
const slideDuration = 5000;

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const overallProgressRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 0));
    }, slideDuration / 100);

    if (progress >= 100) {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setProgress(0);
    }

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    const overallProgress = currentSlide * 100 + progress;
    if (overallProgressRef.current) {
      const size = window.innerWidth > 768 ? 138 : 115;
      const borderSize = 8;
      const totalLength = size * 4;
      const progressLength =
        (overallProgress / (totalSlides * 100)) * totalLength;

      let backgroundPosition = "";
      if (progressLength <= size) {
        backgroundPosition = `${-size + progressLength}px 0px, ${
          size - borderSize
        }px -${size}px, ${size}px ${size - borderSize}px, 0px ${
          size - borderSize
        }px`;
      } else if (progressLength <= size * 2) {
        backgroundPosition = `0px 0px, ${size - borderSize}px ${
          -size + (progressLength - size)
        }px, ${size}px ${size - borderSize}px, 0px ${size - borderSize}px`;
      } else if (progressLength <= size * 3) {
        backgroundPosition = `0px 0px, ${size - borderSize}px 0px, ${
          size - (progressLength - size * 2)
        }px ${size - borderSize}px, 0px ${size - borderSize}px`;
      } else {
        backgroundPosition = `0px 0px, ${size - borderSize}px 0px, 0px ${
          size - borderSize
        }px, 0px ${size - (progressLength - size * 3)}px`;
      }

      overallProgressRef.current.style.backgroundPosition = backgroundPosition;
    }
  }, [currentSlide, progress]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);

    if (overallProgressRef.current) {
      overallProgressRef.current.style.backgroundPosition =
        "0px 0px, 130px 0px, 0px 130px, 0px 0px";
    }
  };

  return (
    <div className="h-screen flex justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full z-10"
        >
          <Image
            src={slides[currentSlide]}
            alt="slider"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative md:left-[135px] left-4 z-10 flex flex-col text-left justify-center items-start w-full max-w-[1440px]">
        <span className="md:text-secondary text-[#F9F4EE] text-sm md:text-[16px] leading-[24px]">
          Welcome To TenTwenty Farms
        </span>
        <h1 className="md:text-xxl text-[46px] text-secondary md:leading-[64px] leading-[46px] mt-[15px] md:mt-[48px] capitalize font-normal">
          From Our <br className="block md:hidden" /> Farms <br className="" />{" "}
          to your hands
        </h1>

        <div className="absolute bottom-[100px] md:left-[168px] left-[138px] flex items-center gap-4">
          <span className="md:text-secondary text-[#F9F4EE] md:text-[16px] text-sm">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <div
            className="md:w-[103px] w-[100px] h-[1px] overflow-hidden relative"
            style={{ backgroundColor: "rgba(238, 244, 249, 0.3)" }}
          >
            <motion.div
              key={currentSlide}
              className="h-full bg-white absolute left-0 top-0"
            />
          </div>
          <span className="md:text-secondary text-[#F9F4EE] md:text-[16px] text-sm">
            0{totalSlides}
          </span>
        </div>
        <div className="absolute bottom-[50px] flex items-center gap-4">
          <div
            className="progress md:w-[138px] w-[115px] h-[115px] md:h-[138px] relative"
            ref={overallProgressRef}
          >
            <button
              className="bottom-[0px] left-[0px] z-20 flex items-center gap-2 rounded text-white relative"
              onClick={handleNext}
            >
              <Image
                src={slides[(currentSlide + 1) % totalSlides]}
                alt="Next slide"
                width={93}
                height={93}
                className="rounded md:h-[93px] md:w-[93px] w-[77px] h-[77px]"
              />
              <span className="absolute inset-0 flex items-center justify-center ">
                Next
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
