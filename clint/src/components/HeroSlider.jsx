import React, { useEffect, useState } from "react";
import api from "../api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);

  const fetchSlides = async () => {
    try {
      const { data } = await api.get("/api/sliders");
      setSlides(data);
    } catch (e) {
      console.log("Slider error:", e?.response?.data || e.message);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  if (slides.length === 0) {
    return (
      <div className="w-full h-[350px] rounded-3xl bg-gray-100 flex items-center justify-center text-gray-400 mb-10">
        Slider rasmlar hozircha yo‘q
      </div>
    );
  }

  return (
    <div className="mb-10">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="rounded-3xl overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[350px] md:h-[450px]">
              <img
                src={slide.image}
                alt={slide.title || "slider"}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/35 flex flex-col justify-center px-8 md:px-16">
                <h2 className="text-white text-3xl md:text-5xl font-black mb-3">
                  {slide.title || "Slider title"}
                </h2>
                <p className="text-white/90 text-sm md:text-lg max-w-xl">
                  {slide.subtitle || "Slider subtitle"}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;