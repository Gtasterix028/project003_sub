/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";

import {
  Navbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  MenuList,
  Collapse,
  MenuHandler,
  ListItem,
  Menu,
} from "@material-tailwind/react";
// import { FaUser  } from 'react-icons/fa'; // Import the icon you want to use
import PersonOutline from '@mui/icons-material/PersonOutline';


import { Link, useLocation } from "react-router-dom";

import Cookies from "js-cookie";

import Profile from "../Profile/Profile";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/ui/ucdap.png"
import logo3 from "../../assets/ui/UCDAP_white.png"
import underline from "../../assets/Home_undrline.png";


import { jwtDecode } from "jwt-decode";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import cartechlogo2 from "/cars/cartechlogo2.png";
///////////////
export function StickyNavbar() {

// New code for the home page start here 
  const [showNavbar, setShowNavbar] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);
const [activeTab, setActiveTab] = useState("Home");

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);

// New code for the home page end here 

  const [openNav, setOpenNav] = useState(false);

  const token = Cookies.get("token");

  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userRole = token ? jwtDecodes?.authorities[0] : null;

  // eslint-disable-next-line no-unused-vars

  const DealerId = token ? jwtDecodes?.dealerId : null;
  // const userid = token ? jwtDecodes?.userId : null;
  const InspectorProfileId = token ? jwtDecodes?.inspectorProfileId : null;

  const salesPersonId = token ? jwtDecodes?.salesPersonId : null;

  const UserId = token ? jwtDecodes?.userId : null;
  const userProfileId = token ? jwtDecodes?.userProfileId : null;

  const location = useLocation();

  const handleMenuItemClick = () => {
    setOpenNav(false);
  };

  const active = location.pathname === `/dealer/${jwtDecodes?.dealerId}`;
  function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navListMenuItems = [
      {
        title: "Bidding Car",
        link:
          userRole === "DEALER"
            ? "/dealer/biddingcar"
            : userRole === "ADMIN"
              ? "/admin/biddingcar"
              : userRole === "SALESPERSON"
                ? "/sales/biddingcar"
                : null,
      },
    ];
    if (userRole === "ADMIN") {
      navListMenuItems.unshift(
        {
          title: "Dashboard",

          link: `/`,
        },
        {
          title: "Car Models",
          link: "/carlistmodel",
        },

        {
          title: "Car Colors",
          link: "/admin/addcolor",
        },

        // {
        //   title: "User Request",
        //   link: "/Admin/UserRequest",
        // },
        {
          title: "Premium Car List",
          link: "/carlistadmin",
        },
        {
          title: "B2B Cars",
          link: "/adminB2B",
        }
      );
    }

    if (userRole === "DEALER") {
      navListMenuItems.unshift(
        {
          title: "Cars",
          link: `/dealer/${jwtDecodes?.dealerId}`,
        },
        {
          title: "Premium Cars",
          link: `/dealer/premium/${jwtDecodes?.dealerId}`,
        },
        {
          title: "Winner Section",
          link: `/dealer/winnersection`,
        },
      );
    }
    if (userRole === "SALESPERSON") {
      navListMenuItems.unshift(
        {
          title: "B2B",
          link: `/Seller/b2b/pending`,
        },

      );
    }
    const renderItems = navListMenuItems.map(({ title, link }, key) => (
      <Link to={link} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg hover:bg-[#2d3483]">
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-normal text-white"
            >
              {title}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    ));

    return (
      <React.Fragment>
        <Menu
          open={isMenuOpen}
          handler={setIsMenuOpen}
          offset={{ mainAxis: 20 }}
          placement="bottom"
          allowHover={true}
        >
          <MenuHandler>
            <Typography as="div" variant="small" className="font-medium">
              <ListItem
                className={`flex items-center gap-2 p-3 font-medium text-white hover:bg-indigo-400`}
                selected={isMenuOpen || isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((cur) => !cur)}
              >
                Dashboard
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                    }`}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                    }`}
                />
              </ListItem>
            </Typography>
          </MenuHandler>
          <MenuList className="hidden max-w-screen-xl rounded-xl lg:block bg-[#626deb] border-none">
            <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
              {renderItems}
            </ul>
          </MenuList>
        </Menu>
        <div className="block lg:hidden">
          <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
        </div>
      </React.Fragment>
    );
  }
  function PendingListMenu() {
    const [isMenuOpen1, setIsMenuOpen1] = useState(false);
    const [isMobileMenuOpen1, setIsMobileMenuOpen1] = useState(false);
    const navListMenuItems = [

    ];


    if (userRole === "DEALER") {
      navListMenuItems.unshift(
        {
          title: "Pending Request",
          link: `/dealer/${jwtDecodes?.dealerId}/allpending`,
        },
        {
          title: "B2B Pending Booking",
          link: `/dealer/${jwtDecodes?.dealerId}/b2bpending`,
        }
      );
    }
    const renderItems1 = navListMenuItems.map(({ title, link }, key) => (
      <Link to={link} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg hover:bg-[#2d3483]">
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-normal text-white"
            >
              {title}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    ));

    return (
      <React.Fragment>
        <Menu
          open={isMenuOpen1}
          handler={setIsMenuOpen1}
          offset={{ mainAxis: 20 }}
          placement="bottom"
          allowHover={true}
        >
          <MenuHandler>
            <Typography as="div" variant="small" className="font-medium">
              <ListItem
                className={`flex items-center gap-2 p-3 font-medium text-white hover:bg-indigo-400`}
                selected={isMenuOpen1 || isMobileMenuOpen1}
                onClick={() => setIsMobileMenuOpen1((cur) => !cur)}
              >
                Pending Booking
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen1 ? "rotate-180" : ""
                    }`}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen1 ? "rotate-180" : ""
                    }`}
                />
              </ListItem>
            </Typography>
          </MenuHandler>
          <MenuList className="hidden max-w-screen-xl rounded-xl lg:block bg-[#626deb] border-none">
            <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
              {renderItems1}
            </ul>
          </MenuList>
        </Menu>
        <div className="block lg:hidden">
          <Collapse open={isMobileMenuOpen1}>{renderItems1}</Collapse>
        </div>
      </React.Fragment>
    );
  }

  function ConfermListMenu() {
    const [isMenuOpen2, setIsMenuOpen2] = useState(false);
    const [isMobileMenuOpen2, setIsMobileMenuOpen2] = useState(false);
    const navListMenuItems = [];

    if (userRole === "DEALER") {
      navListMenuItems.unshift(
        {
          title: "Confirm Booking",
          link: `/dealer/${jwtDecodes?.dealerId}/booking/confirm`,
        },
        {
          title: "B2B Confirm Booking ",
          link: `/dealer/${jwtDecodes?.dealerId}/b2b/confirm`,
        }
      );
    }
    const renderItems2 = navListMenuItems.map(({ title, link }, key) => (
      <Link to={link} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg hover:bg-[#2d3483]">
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-normal text-white"
            >
              {title}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    ));

    return (
      <React.Fragment>
        <Menu
          open={isMenuOpen2}
          handler={setIsMenuOpen2}
          offset={{ mainAxis: 20 }}
          placement="bottom"
          allowHover={true}
        >
          <MenuHandler>
            <Typography as="div" variant="small" className="font-medium">
              <ListItem
                className={`flex items-center gap-2 p-3 font-medium text-white hover:bg-indigo-400`}
                selected={isMenuOpen2 || isMobileMenuOpen2}
                onClick={() => setIsMobileMenuOpen2((cur) => !cur)}
              >
                Confirm Booking
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen2 ? "rotate-180" : ""
                    }`}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen2 ? "rotate-180" : ""
                    }`}
                />
              </ListItem>
            </Typography>
          </MenuHandler>
          <MenuList className="hidden max-w-screen-xl rounded-xl lg:block bg-[#626deb] border-none">
            <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
              {renderItems2}
            </ul>
          </MenuList>
        </Menu>
        <div className="block lg:hidden">
          <Collapse open={isMobileMenuOpen2}>{renderItems2}</Collapse>
        </div>
      </React.Fragment>
    );
  }

  const adminDashboard = userRole?.includes("ADMIN") ? (
    <>


      <Link to={"/admin"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/admin"
              ? "bg-[#5e67c7] text-white"
              : ""
            }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          Dealers
        </Typography>
      </Link>
      <NavListMenu />

      <Link to={"/inspector"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/inspector"
              ? "bg-[#5e67c7] text-white"
              : ""
            }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          Inspectors
        </Typography>
      </Link>
      <Link to={"/admin/salesuser"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/admin/salesuser"
              ? "bg-[#5e67c7] text-white"
              : ""
            }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          Seller
        </Typography>
      </Link>

      {/* <NotificationDialog /> */}
    </>
  ) : null;

  const inspectorDashboard = userRole?.includes("INSPECTOR") ? (
    <>
      <Link to={`/inspector/car`}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === `/inspector/car`
              ? "bg-[#5e67c7] text-white"
              : ""
            }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          Cars
        </Typography>
      </Link>
      <Link to={`/inspector/user/cars`}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === `/inspector/user/cars`
              ? "bg-[#5e67c7] text-white"
              : ""
            }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          User Cars
        </Typography>
      </Link>

      {/* <NotificationDialog /> */}
    </>
  ) : null;

  const salePersonDashboard = userRole?.includes("SALESPERSON") ? (
    <>
      <Link to={"/sales/salesDealers"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/sales/salesDealers"
              ? "bg-[#5e67c7] text-white"
              : ""
            }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          Dealers
        </Typography>
      </Link>
      <Link to={`/seller/request/active`}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === `/Seller/UserRequest`
              ? "bg-[#5e67c7] text-white"
              : ""
            }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          User Cars
        </Typography>
      </Link>
      <NavListMenu />

      {/* <NotificationDialog /> */}
    </>
  ) : null;

  const dealerDashboard = userRole?.includes("DEALER") ? (
    <>
      <Link to={"/carlist"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/carlist"
              ? "bg-[#5e67c7] text-white"
              : ""
            }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          Buy Car
        </Typography>
      </Link>

      <Link to={`/dealer/B2B`}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname ===
              `/dealer/B2B`
              ? "bg-[#5e67c7] text-white"
              : ""
            }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          B2B
        </Typography>
      </Link>

      <Link to={"/dealer/live/cars"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/dealer/live/cars"
              ? "bg-[#5e67c7] text-white"
              : ""
            }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          Live Cars
        </Typography>
      </Link>

      <NavListMenu />

      <PendingListMenu />

      <ConfermListMenu />

      {/* <NotificationDialog /> */}
    </>
  ) : null;

  const userDashboard = userRole?.includes("USER") ? (
    <>
      <Link to={`/sellcarlist`}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/sellcarlist"
              ? "bg-[#5e67c7] text-white"
              : ""
            }hover:bg-indigo-400`}
        >
          Sell Car
        </Typography>
      </Link>

      <Link to={`/pendinrequest/${jwtDecodes?.userId}`}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/pendinrequest"
              ? "bg-[#5e67c7] text-white"
              : ""
            }hover:bg-indigo-400`}
        >
          All Request
        </Typography>
      </Link>

      {/* <Link to={`/user/booking/${jwtDecodes?.userId}`}>

        <Typography

          as="li"

          variant="small"

          color="blue-gray"

          className={`p-3 rounded-md font-normal ${window.location.pathname === `/user/booking/${jwtDecodes?.userId}` ? "bg-indigo-200 text-white" : ""}`}

        >

          Confirm Booking

        </Typography>

      </Link> */}

      <Link to={`/user/${jwtDecodes?.userId}/favorite`}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname ===
              `/dealer/${jwtDecodes?.userId}/booking/confirm`
              ? "bg-[#5e67c7] text-white"
              : ""
            }hover:bg-indigo-400`}
        >
          Favourite
        </Typography>
      </Link>

      {/* <NotificationDialog /> */}
    </>
  ) : null;

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    // if(location.pathname !== priv.location.pathname){
    //   window.scrollTo(0, 0);
    // }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 p-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to={"/"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/" ? "bg-[#5e67c7] text-white" : ""
            } hover:bg-indigo-400 `}
          onClick={handleMenuItemClick}
        >
          Home
        </Typography>
      </Link>

      <Link to={"/premiumcarlist"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/premiumcarlist"
              ? "bg-[#5e67c7] text-white"
              : ""
            } hover:bg-indigo-400 `}
          onClick={handleMenuItemClick}
        >
          Premium Cars
        </Typography>
      </Link>

      {userRole == "DEALER" ||
        userRole == "INSPECTOR" ||
        userRole == "SALESPERSON" ? null : (
        <>
          <Link to={"/carlist"}>
            <Typography
              as="li"
              variant="small"
              color="white"
              className={`p-3 rounded-md font-normal ${window.location.pathname === "/carlist"
                  ? "bg-[#5e67c7] text-white"
                  : ""
                }hover:bg-indigo-400 `}
              onClick={handleMenuItemClick}
            >
              Buy Car
            </Typography>
          </Link>
          {/* <Link to={"/buypremiumcars"}>
            <Typography
              as="li"
              variant="small"
              color="white"
              className={`p-3 rounded-md font-normal ${
                window.location.pathname === "/dealer/live/cars"
                  ? "bg-[#5e67c7] text-white"
                  : ""
              }hover:bg-indigo-400`}
              onClick={handleMenuItemClick}
            >
              Buy Premium Car
            </Typography>
          </Link> */}
        </>
      )}
      {adminDashboard}
      {dealerDashboard}
      {userDashboard}
      {inspectorDashboard}
      {salePersonDashboard}
    </ul>
  );

  const isHomePage = location.pathname === "/";

  return (
    <div
      className={`w-full lg:h-[16vh] fixed top-0 left-0 z-50 transition-transform duration-300 ${
        isHomePage 
          ? "bg-white/10 backdrop-blur-md" 
          : "bg-black/90 backdrop-blur-md"
      } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="flex items-center justify-between px-2 sm:px-4 lg:px-8 py-2 sm:py-4 md:py-5 lg:py-3">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center justify-start pl-0 ml-0 gap-0 ">
          <div className="flex items-center gap-5">
            <img src={logo} alt="Logo 1" className="w-12 h-12 object-contain" />
            <img 
              src={isHomePage ? logo3 : logo3} 
              alt={isHomePage ? "Logo 2" : "Logo 3"} 
              className="w-16 h-14 object-contain" 
            />
          </div>
          <div className="text-white font-semibold text-xs sm:text-sm text-center leading-tight">
            CARYANAM INDIA
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 text-white">
          {[{ label: "Home", path: "/" }, { label: "Premium Cars", path: "/premiumcarlist" }, { label: "Buy Car", path: "/carlist" }].map(({ label, path }) => {
            const isActive = activeTab === label;
            return (
              <div
                key={label}
                className="relative text-base md:text-lg lg:text-xl font-light font-['Roboto'] cursor-pointer flex flex-col items-center"
                onClick={() => setActiveTab(label)}
              >
                <Link to={path}>{label}</Link>
                {/* Underline only on md and up */}
                {isActive && (
                  <img
                    src={underline}
                    alt="underline"
                    className="hidden md:block absolute top-[30px] left-1/2 -translate-x-1/2 w-10 sm:w-14 lg:w-16 h-2 transition-all duration-300"
                  />
                )}
              </div>
            );
          })}
          {/* Insert your role-based nav items here */}
          {adminDashboard}
          {dealerDashboard}
          {userDashboard}
          {inspectorDashboard}
          {salePersonDashboard}
        </div>

        {/* Login/Register/Profile for md and above */}
        <div className="hidden md:flex items-center justify-center bg-white rounded-full px-4 py-1 shadow hover:scale-105 transition">
          {token ? (
            <Profile
              userId={UserId}
              dealer_id={DealerId}
              userrole={userRole}
              inspectorProfileId={InspectorProfileId}
              salesPersonId={salesPersonId}
              userProfileId={userProfileId}
            />
          ) : (
            <>
            <Link
              to="/signin"
              className="text-[#131C24] text-xs sm:text-sm md:text-base lg:text-lg font-medium font-['Roboto'] text-center hover:underline mr-1"
              onClick={() => setOpenNav && setOpenNav(false)}
            >
              Login
            </Link>
            /
            <Link
              to="/signup"
              className="text-[#131C24] text-xs sm:text-sm md:text-base lg:text-lg font-medium font-['Roboto'] text-center hover:underline ml-1"
              onClick={() => setOpenNav && setOpenNav(false)}
            >
              Register
            </Link>
          </>
          
          )}
        </div>

        {/* Hamburger for Mobile */}
        <div
          className="md:hidden flex flex-col justify-between w-7 h-5 cursor-pointer z-50"
          onClick={() => setOpenNav(!openNav)}
        >
          {!openNav ? (
            <>
              <span className="h-0.5 w-full bg-white rounded"></span>
              <span className="h-0.5 w-full bg-white rounded"></span>
              <span className="h-0.5 w-full bg-white rounded"></span>
            </>
          ) : (
            <HiX className="text-white text-3xl" />
          )}
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-[75%] bg-[#131C24] text-white p-6 z-40 transition-transform duration-500 ease-in-out ${openNav ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col space-y-6 mt-24 text-lg">
          <Link to="/" onClick={() => setOpenNav(false)} className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/premiumcarlist" onClick={() => setOpenNav(false)} className="hover:text-gray-300">
            Premium Cars
          </Link>
          <Link to="/carlist" onClick={() => setOpenNav(false)} className="hover:text-gray-300">
            Buy Car
          </Link>
          {/* Insert your role-based nav items for mobile here if needed */}
          <div
            onClick={() => setOpenNav(false)}
            className="mt-6 inline-block bg-white text-[#131C24] text-center py-2 px-4 rounded-full shadow hover:scale-105 transition duration-300"
          >
            <span className="text-sm font-medium">
              {token ? (
                <Profile
                  userId={UserId}
                  dealer_id={DealerId}
                  userrole={userRole}
                  inspectorProfileId={InspectorProfileId}
                  salesPersonId={salesPersonId}
                  userProfileId={userProfileId}
                />
              ) : (
                <>
                  <Link to="/signin" className="hover:underline mr-1" onClick={() => setOpenNav(false)}>
                    Login
                  </Link>
                  /
                  <Link to="/signup" className="hover:underline ml-1" onClick={() => setOpenNav(false)}>
                    Register
                  </Link>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
