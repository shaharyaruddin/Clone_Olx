import advertisebanner from "/assets/icons/olx-advertise.png";
import advertisebanner2 from "/assets/icons/advertise2.jfif";

export default function AdvertiseBanner() {
  return (
    <div className="pt-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex flex-col gap-4 justify-center items-center ">
      <div>
        <img
          src={advertisebanner}
          className="w-full h-auto rounded md:w-[1500px] md:h-56 object-cover"
          alt="Advertisement Banner"
        />
      </div>
      <div>
        <img src={advertisebanner2} alt="advertisement banner" />
      </div>
    </div>
  );
}
