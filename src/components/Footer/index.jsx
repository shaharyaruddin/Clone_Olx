import React from "react";
import { useNavigate } from "react-router-dom";
import footerBanner from "/assets/icons/footer-banner.webp";

const sections = [
  {
    title: "Popular Categories",
    links: [
      { name: "Cars", apicategory: "vehicle" },
      { name: "Flats for rent", apicategory: "home-decoration" },
      { name: "Jobs", apicategory: "laptops" },
      { name: "Mobile Phones", apicategory: "smartphones" },
    ],
  },
  {
    title: "Trending Searches",
    links: [
      { name: "Bikes", apicategory: "vehicle" },
      { name: "Watches", apicategory: "mens-watches" },
      { name: "Books", apicategory: "laptops" },
      { name: "Dogs", apicategory: "laptops" },
    ],
  },
  {
    title: "About Us",
    links: [
      { name: "About OLX Group", href: "#" },
      { name: "OLX Blog", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "OLX for Businesses", href: "#" },
    ],
  },
  {
    title: "Olx",
    links: [
      { name: "Help", href: "#" },
      { name: "Sitemap", href: "#" },
      { name: "Terms of use", href: "#" },
      { name: "Privacy policy", href: "#" },
    ],
  },
];

const Section = ({ title, links, navigate }) => (
  <div>
    <h4 className="font-bold mb-4">{title}</h4>
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <a
            onClick={() =>
              link.apicategory && navigate(`/category/${link.apicategory}`)
            }
            className="text-sm text-gray-400 hover:text-black cursor-pointer"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

function Footer() {
  const navigate = useNavigate();
  return (
    // <>
    //    <div className="bg-[#f8faf9] mt-20">
    //       <div className="flex items-center justify-center gap-3 mx-auto sm:px-6 lg:px-8">
    //         <img src={footerBanner} className="object-contain" alt="Footer Banner" />
    //         <div className="p-6 text-center md:text-start">
    //           <h1 className="text-4xl font-medium">TRY THE OLX APP</h1>
    //           <h3 className="text-xl">
    //             Buy, sell and find just about anything using the app on your mobile.
    //           </h3>
    //         </div>
    //       </div>
    //       </div>
    // <footer className="bg-[#ebeeef] border-t py-8 w-full">
    //   <div className="container mx-auto max-w-7xl px-4 lg:px-8">
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    //       {sections.map((section, index) => (
    //         <Section
    //           key={index}
    //           title={section.title}
    //           links={section.links}
    //           navigate={navigate}
    //         />
    //       ))}
    //     </div>
    //   </div>
    //   <div className="text-center mt-8 text-gray-500 text-sm">
    //     © 2024 OLX, All rights reserved.
    //   </div>
    // </footer>
    // </>
    <>
      <div className="bg-[#f8faf9] py-8 px-4 md:px-6 lg:px-8 mt-20">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 mx-auto max-w-7xl">
          <img
            src={footerBanner}
            className="object-contain w-full max-w-xs md:max-w-md"
            alt="Footer Banner"
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2">
              TRY THE OLX APP
            </h1>
            <h3 className="text-lg sm:text-xl md:text-2xl">
              Buy, sell and find just about anything using the app on your
              mobile.
            </h3>
          </div>
        </div>
      </div>

      <footer className="bg-[#ebeeef] border-t py-8 w-full">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sections.map((section, index) => (
              <Section
                key={index}
                title={section.title}
                links={section.links}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
        <div className="text-center mt-8 text-gray-500 text-sm">
          © 2024 OLX, All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Footer;
