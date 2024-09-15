import { useEffect, useState } from "react";
import icon from "/assets/icons/olx-web-icon.png";
import carIcon from "/assets/icons/car-icon.png";
import buttonIcon from "/assets/icons/button-icon.svg";
import profileIcon from "/assets/icons/profile-icon.png";
import propertyIcon from "/assets/icons/property-icon.png";
import { Disclosure } from "@headlessui/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { HiBars3 } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoChevronDown, IoDocumentTextOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../../firebase/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { CiCamera } from "react-icons/ci";
import { BsChat } from "react-icons/bs";
import { IoMdHelpCircleOutline } from "react-icons/io";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import { menuItems, menuMobileItems } from "../../common/categories";

const navigation = [
  { name: "Start selling", icon: CiCamera, to: "/", current: true },
  { name: "My ads", to: "/team", icon: IoDocumentTextOutline, current: false },
  { name: "Chat", to: "/team", icon: BsChat, current: false },
  { name: "Help", to: "/team", icon: IoMdHelpCircleOutline, current: false },
];

const locationMenu = [
  "Sindh, Pakistan",
  "Punjab, Pakistan",
  "Balouchistan, Pakistan",
  "Azad Kashmir, Pakistan",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ user }) {
  const auth = getAuth(app);
  const [username, setUsername] = useState("");
  const firestore = getFirestore(app);
  const [selectedItem, setSelectedItem] = useState("Location or Compound");
  const [location, setLocation] = useState("Use current location");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const fetchUsername = async (user) => {
      if (user.displayName) {
        setUsername(user.displayName);
      } else {
        // Get username from firestore database
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.name);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUsername(user);
      } else {
        setUsername(""); // Clear username if not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, firestore]);

  // Location Logic
  const getLocation = async () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          const response = await axios.get(url);
          setLoading(false);
          const town =
            response.data.address?.town ||
            response.data.address?.city ||
            "Location not found";
          setLocation(town);
          setSelectedItem(town);
          console.log("position", position);
        } catch (err) {
          setLoading(false);
          setLocation("Unable to fetch");
          setSelectedItem("Please try again");
          console.error(err);
        }
      },
      (err) => {
        setLoading(false);
        setLocation("Unable to fetch location");
        setSelectedItem("Please try again");
        console.error(err);
      }
    );
  };

  const handleSearch = () => {
    if (!searchQuery) {
      return;
    } else {
      navigate(`/items/${searchQuery}`);
    }
  };

  // Usage

  return (
    <>
      <Disclosure
        as="nav"
        className="sticky top-0 bg-white z-10 border border-b pb-0 md:pb-5"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex flex-col p-2 h-16 items-center md:items-start justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500">
                    <span className="absolute -inset-0.5" />
                    {open ? (
                      <HiBars3 className=" h-6 w-6" />
                    ) : (
                      <HiBars3 className=" h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center gap-5 md:gap-9 sm:items-stretch sm:justify-start ml-[22px] md:ml-0">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <img
                        className="h-8 w-auto"
                        src={icon}
                        alt="Your Company"
                      />
                    </Link>
                  </div>

                  <div className="flex gap-2 justify-center items-center text-center hover:text-blue-400 cursor-pointer">
                    <div className="w-9 h-9 border border-black rounded-full flex justify-center items-center">
                      <img src={carIcon} width="25px" alt="Car Icon" />
                    </div>
                    <div>
                      <h3 className="font-bold">Motors</h3>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center items-center text-center hover:text-blue-400 cursor-pointer">
                    <div className="w-10 h-10 border border-black rounded-full flex justify-center items-center">
                      <img
                        src={propertyIcon}
                        width="25px"
                        alt="Property Icon"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">Property</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex flex-row items-center gap-4">
                <Menu as="div" className="relative w-72">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-between items-center px-3 h-12 text-sm border border-[#d8dfe0] rounded">
                      <div className="flex gap-2 items-center">
                        {loading ? (
                          <PuffLoader
                            color={"blue"}
                            loading={loading}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          <HiOutlineLocationMarker size={26} />
                        )}
                        <p className="block text-sm cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis">
                          {selectedItem}
                        </p>
                      </div>
                      <IoChevronDown
                        aria-hidden="true"
                        className="-mr-1 h-6 w-6"
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items className="absolute w-72 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded">
                    <Menu.Item>
                      <div
                        className=" px-4 py-4 text-md cursor-pointer text-blue-500 font-bold hover:bg-[#d3fcfc]"
                        onClick={getLocation}
                      >
                        <div className="flex gap-2 items-center">
                          <HiOutlineLocationMarker fontSize={26} />
                          {location}
                          {/* Use Current Location */}
                        </div>
                      </div>
                    </Menu.Item>
                    {locationMenu.map((item, index) => (
                      <Menu.Item key={index}>
                        <div
                          className=" px-4 py-3 text-sm cursor-pointer hover:bg-[#d3fcfc]"
                          onClick={() => handleSelect(item)}
                        >
                          <div className="flex gap-2 items-center">
                            <HiOutlineLocationMarker size={26} />
                            {item}
                          </div>
                        </div>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>

                <div className="relative w-2/4">
                  <input
                    type="search"
                    value={searchQuery}
                    placeholder="Find Cars, Mobile Phones and more..."
                    className="border border-[#d8dfe0] focus:border-[#23e5db] p-3 w-full h-12 rounded outline-none pr-12"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ paddingRight: "3rem" }}
                  />
                  <div
                    className="absolute top-0 right-0 h-12 w-12 rounded-r bg-black flex items-center justify-center"
                    onClick={handleSearch}
                  >
                    <FaSearch className="h-6 w-6 text-white pointer-events-none" />
                  </div>
                </div>
                <div className="flex">
                  {user ? (
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton className="inline-flex w-full items-center justify-center gap-x-1.5 bg-white py-2 text-sm font-semibold text-gray-900">
                          <img src={profileIcon} height={35} width={38} />
                          <IoChevronDown
                            aria-hidden="true"
                            className="-mr-1 h-5 w-5 text-gray-400"
                          />
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg "
                      >
                        <div className="py-1">
                          <MenuItem>
                            <div className="flex items-center gap-5 px-3">
                              <div>
                                <img src={profileIcon} width={65} />
                              </div>
                              <div>
                                <p>Hello,</p>
                                <span className="w-full font-bold">
                                  {username}
                                </span>
                              </div>
                            </div>
                          </MenuItem>
                          <MenuItem>
                            <Link to="editProfile/info">
                              <div className="flex justify-center py-3 px-4 border-b w-full">
                                <button className="border-2 border-black py-2 px-2 rounded-md w-full">
                                  View and edit your profile
                                </button>
                              </div>
                            </Link>
                          </MenuItem>
                          {menuItems.map((item, index) => (
                            <MenuItem key={index}>
                              <Link to={item.href}>
                                <div className="flex items-center gap-5 py-3 px-4 hover:bg-[#d3fcfc] cursor-pointer">
                                  {<item.icon className=" text-2xl" />}
                                  <p>{item.text}</p>
                                </div>
                              </Link>
                            </MenuItem>
                          ))}
                          <MenuItem>
                            <div
                              className="flex items-center gap-5 py-3 px-3 hover:bg-[#d3fcfc] cursor-pointer"
                              onClick={() => signOut(auth)}
                            >
                              <MdLogout className="text-2xl" />
                              <p>Logout</p>
                            </div>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  ) : (
                    <Link
                      to="/login"
                      className="border-black border-b-2 font-bold cursor-pointer"
                    >
                      Login
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <img src={buttonIcon} alt="Button Icon" className="block" />
                  <h2 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-bold cursor-pointer">
                    + Sell
                  </h2>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden h-screen overflow-y-auto">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <div className="flex gap-5 items-center">
                  <div>
                    <img src={profileIcon} height={45} width={48} />
                  </div>
                  {user ? (
                    <>
                      <div>
                        Hello,
                        <br />
                        <p className="font-bold">{username}</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className="text-sm"> Enter to your account</p>
                      <Link to="/login">
                        <p className="underline text-sm">
                          Log in to your account
                        </p>
                      </Link>
                    </div>
                  )}
                </div>

                <div>
                  {user
                    ? menuMobileItems.map((item) => (
                        <Link to={item.href} key={item.id}>
                          <div
                            key={item.id}
                            className="flex items-center gap-5 hover:bg-[#d3fcfc] rounded-md px-3 py-2 text-base font-medium"
                          >
                            <item.icon fontSize="25" />
                            <p>{item.text}</p>
                          </div>
                        </Link>
                      ))
                    : navigation.map((item, index) => (
                        <Link
                          key={index}
                          to={item.to}
                          className={classNames(
                            item.current
                              ? "hover:bg-[#d3fcfc] text-black"
                              : "text-black hover:bg-[#d3fcfc]",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <div className="flex items-center gap-5">
                            <item.icon fontSize="25" />
                            {item.name}
                          </div>
                        </Link>
                      ))}
                </div>
                {user && (
                  <div
                    className="flex items-center gap-5 py-2 px-3 hover:bg-[#d3fcfc] cursor-pointer m-18"
                    onClick={() => signOut(auth)}
                  >
                    <MdLogout className="text-2xl" />
                    <p>Logout</p>
                  </div>
                )}
                {!user && (
                  <div>
                    <Link to="/login">
                      <div className="bg-[#002f34] p-3 text-center text-white font-bold rounded-md mt-3 mb-3">
                        <button>Login</button>
                      </div>
                    </Link>
                    <Link to="/signup">
                      <div className="border-2 border-[#002f34] p-3 text-center text-[#002f34] font-bold rounded-md">
                        <button>Create a new account</button>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
