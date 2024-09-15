// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/effect-fade";
// import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// export default function Slider({ images }) {
//   return (
//     <Swiper
//       modules={[Autoplay, Pagination, Navigation, EffectFade]}
//       spaceBetween={30}
//       centeredSlides={false} // Align slides to the left
//       pagination={{ clickable: true }}
//       navigation={true}
//       loop={false}
//       effect="fade"
//       fadeEffect={{ crossFade: true }}
//       color="white"
//       speed={1600}
//       className="mySwiper mx-auto max-w-7xl px-20 md:px-40 lg:px-36 w-full lg:w-2/4  md:h-[450px] border md:rounded-md bg-black" // Adjust width and height as per your design
//     >
//       {images.map((image, index) => (
//         <SwiperSlide key={index} className="relative">
//           <div className="h-full flex items-center justify-center bg-white">
//             <img
//               src={image}
//               alt={`Slide ${index}`}  
//               className="h-full object-cover"
//             />
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

export default function Slider({ images }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      spaceBetween={30}
      centeredSlides={false}
      pagination={{ clickable: true }}
      navigation={true}
      loop={false}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      speed={1600}
      className="mySwiper mx-auto w-full md:w-3/4 lg:w-2/4 h-64 sm:h-80 md:h-96 lg:h-[450px] px-4 md:px-8 lg:px-12 border border-black rounded-md"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="relative">
          <div className="h-full flex items-center justify-center bg-white">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="h-full object-cover w-full"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
