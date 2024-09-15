import { GrCopy } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { MdHelpOutline } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { RiBillLine } from "react-icons/ri";
import { CgCreditCard } from "react-icons/cg";
import { CiCamera } from "react-icons/ci";
import { IoDocumentTextOutline, IoChatbubbleOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

export const categories = [
  {
    id: 1,
    title: "Mobile Phones",
    apicategory: "smartphones",
  },
  {
    id: 2,
    title: "Cars",
    apicategory: "vehicle",
  },
  {
    id: 3,
    title: "Motercycles",
    apicategory: "motorcycle",
  },
  {
    id: 4,
    title: "Houses",
    apicategory: "home-decoration",
  },
  {
    id: 5,
    title: "Audio-Videos",
    apicategory: "laptops",
  },
  {
    id: 6,
    title: "Tablets",
    apicategory: "tablets",
  },
];

export const dropdowncategories = [
  {
    id: 1,
    title: "Mobiles",
    nested: [
      {
        title: "Mobile Phones",
      },
      {
        title: "Accessories",
      },
      {
        title: "Smart Watches",
      },
      {
        title: "Tablets",
      },
    ],
  },
  {
    id: 1,
    title: "Bikes",
    nested: [
      {
        title: "Motercycles",
      },
      {
        title: "Bicycles",
      },
      {
        title: "Spare Parts",
      },
      {
        title: "Bikes Accessories",
      },
    ],
  },
  {
    id: 1,
    title: "Jobs",
    nested: [
      {
        title: "Online",
      },
      {
        title: "Other Jobs",
      },
      {
        title: "Education",
      },
      {
        title: "Content Writing",
      },
    ],
  },
  {
    id: 1,
    title: "Furniture & Home Decor",
    nested: [
      {
        title: "Sofa & Chairs",
      },
      {
        title: "Beds & Wardrobes",
      },
      {
        title: "Other Household Items",
      },
      {
        title: "Tables & Dining",
      },
    ],
  },
];

export const allCategoriesWithImages = [
  {
    id: 1,
    icon: "/assets/categories/category-1.png",
    title: "Mobiles",
    apiCategory: "smartphones",
  },
  {
    id: 2,
    icon: "/assets/categories/category-2.png",
    title: "Vehicles",
    apiCategory: "vehicle",
  },
  {
    id: 3,
    icon: "/assets/categories/category-3.png",
    title: "Property For Sale",
    apiCategory: "home-decoration",
  },
  {
    id: 4,
    icon: "/assets/categories/category-4.png",
    title: "Property For Rent",
    apiCategory: "home-decoration",
  },
  {
    id: 5,
    icon: "/assets/categories/category-5.png",
    title: "Electronics & Home Appliances",
    apiCategory: "mens-watches",
  },
  {
    id: 6,
    icon: "/assets/categories/category-6.png",
    title: "Bikes",
    apiCategory: "motorcycle",
  },
  {
    id: 7,
    icon: "/assets/categories/category-7.png",
    title: "Business, Industrial & Agriculture",
    apiCategory: "laptops",
  },
  {
    id: 8,
    icon: "/assets/categories/category-8.png",
    title: "Services",
    apiCategory: "laptops",
  },
  {
    id: 9,
    icon: "/assets/categories/category-9.png",
    title: "Jobs",
    apiCategory: "laptops",
  },
  {
    id: 10,
    icon: "/assets/categories/category-10.png",
    title: "Animals",
    apiCategory: "smartphones",
  },
  {
    id: 11,
    icon: "/assets/categories/category-11.png",
    title: "home-decoration",
  },
  {
    id: 12,
    icon: "/assets/categories/category-12.png",
    title: "Fashion & Beauty",
    apiCategory: "home-decoration",
  },
  {
    id: 13,
    icon: "/assets/categories/category-13.png",
    title: "Books, Sports & Hobbies",
    apiCategory: "vehicle",
  },
  {
    id: 14,
    icon: "/assets/categories/category-14.png",
    title: "Kids",
    apiCategory: "vehicle",
  },
];

export const menuItems = [
  { id: "myAds", icon: GrCopy, text: "My Ads", href: "/myAds" },
  {
    id: "myFavourites",
    icon: FaRegHeart,
    text: "Favourites & Saved searches",
    href: "/myFavourites",
  },
  {
    id: "publicProfile",
    icon: FiEye,
    text: "Public Profile",
    href: "/public-profile",
  },
  {
    id: "pkgs",
    icon: RiBillLine,
    text: "Buy Discounted Packages",
    href: "/buy-discounted-packages",
  },
  {
    id: "bills",
    icon: CgCreditCard,
    text: "Bought Packages and Billing",
    href: "/bought-billing-pacakages",
  },
  { id: "help", icon: MdHelpOutline, text: "Help", href: "/help" },
  { id: "settings", icon: LuSettings, text: "Settings", href: "/settings" },
];

export const menuMobileItems = [
  { id: 1, text: "Start selling", icon: CiCamera, href: "/" },
  {
    id: 2,
    text: "My ads",
    icon: IoDocumentTextOutline,
    href: "/team",
  },
  {
    id: 3,
    text: "Favourites & Saved searches",
    icon: FaRegHeart,
    href: "/myFavourites",
  },
  { id: 4, text: "Public Profile", icon: FiEye, href: "/public-profile" },
  {
    id: 5,
    text: "Buy Discounted Packages",
    icon: RiBillLine,
    href: "/buy-discounted-packages",
  },
  {
    id: 6,
    text: "Bought Packages and Billing",
    icon: CgCreditCard,
    href: "/bought-billing-pacakages",
  },
  {
    id: 7,
    text: "Chat",
    icon: IoChatbubbleOutline,
    href: "/team",
  },
  {
    id: 8,
    text: "Notifications",
    icon: IoMdNotificationsOutline,
    href: "/team",
  },
  { id: 9, text: "Help", icon: MdHelpOutline, href: "/help" },
  { id: 10, text: "Settings", icon: LuSettings, href: "/settings" },
];

export const items = [
  { title: "Mobile Phones", apiCategory: "smartphones" },
  { title: "Cars", apiCategory: "vehicle" },
  { title: "Bikes & Motorcycle", apiCategory: "motorcycle" },
  { title: "Home Decoration", apiCategory: "home-decoration" },
  { title: "Mens Watches", apiCategory: "mens-watches" },
  { title: "Laptops", apiCategory: "laptops" },
];
