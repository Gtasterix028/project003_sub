/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { CarouselCustomArrows } from "./CarouselCustomArrows";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useFavoriteCarMutation,
  useCarremoveFavoriteMutation,
  useCarFavoriteAddRemoveQuery,
} from "../services/carAPI";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteCar, removeFavoriteCar } from "../pages/favoritesSlice";
import DriveEtaIcon from '@mui/icons-material/DriveEta'; // Example icon for KM
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'; // Example icon for fuel type
import TransmissionIcon from '@mui/icons-material/Settings'; // Example icon for transmission (you can choose a better one)
import { FaArrowRight } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import CheckCircle from '@mui/icons-material/CheckCircle';

function RatedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="red"
      className="h-6 w-6"
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  );
}

function UnratedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

export function CardDefault({ data, Carid, refetch,isLoading }) {
  const dispatch = useDispatch();
  const favoriteCars = useSelector((state) => state.favorites.favoriteCars);
  const [isHovered, setIsHovered] = useState(false);

  const [favoriteCar] = useFavoriteCarMutation();
  const token = Cookies.get("token");
  let jwtDecodes;

  // console.log("in cardefault ....."+data)
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const UserId = jwtDecodes?.userId;
  const userRole = token ? jwtDecodes?.authorities[0] : null;
  const data2 = {
    carId: Carid,
    userId: UserId,
  };
  const carid = data2.carId;
  const useid = data2.userId;

  const {
    data: favData,
    error,
    refetch: refetchFavCarData,
  } = useCarFavoriteAddRemoveQuery({ carid, useid });

  const [CarremoveFavorite] = useCarremoveFavoriteMutation();

  const handleFavoriteToggle = async () => {
    const data2 = {
      carId: Carid,
      userId: UserId,
    };
    if (favoriteCars?.find((favCar) => favCar.carId === data.carId)) {
      dispatch(removeFavoriteCar(data));
      const res = await CarremoveFavorite({
        saveCarId: favData?.object?.saveCarId,
      });
      refetchFavCarData();
    } else {
      const res = await favoriteCar(data2);
      dispatch(addFavoriteCar(data2));
      // refetchFavCarData()
    }
  };

  const combinedText = `${data.year} ${data.brand} ${data.model}`;
  const truncatedText =
    combinedText.length > 25
      ? combinedText.substring(0, 22) + "..."
      : combinedText;
  return (
    <div className="flex justify-center mx-auto">

{isLoading || !data ? (
    // Skeleton Card when data is loading
    <div className="max-w-[12rem] md:max-w-[15rem] lg:max-w-[17rem] max-h-[28rem] md:max-h-[25rem] lg:max-h-[28rem] overflow-hidden p-4 border border-gray-300 rounded-lg shadow-lg animate-pulse">
      {/* Skeleton Image */}
      <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
      {/* Skeleton Title */}
      <div className="h-4 bg-gray-200 rounded-lg mb-2"></div>
      {/* Skeleton Subtext */}
      <div className="h-4 bg-gray-200 rounded-lg mb-4"></div>
      {/* Skeleton Text */}
      <div className="h-6 bg-gray-200 rounded-lg mb-2"></div>
    </div>  ) : (
      <Card className=" max-w-[12rem] md:max-w-[15rem] lg:max-w-[17rem] max-h-[28rem] md:max-h-[25rem] lg:max-h-[28rem] overflow-hidden hover:border hover:border-5 hover:shadow-2xl  hover:border-indigo-700 border">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <Link to={`/carlist/cardetails/${data.carId}`}>
            <CarouselCustomArrows carId={data.carId} />
          </Link>
        </CardHeader>
        <CardBody>
            {userRole === "USER" ? (
              <div className="flex justify-end">
                <div onClick={handleFavoriteToggle} className="cursor-pointer">
                  <div className="-mb-6">
                    {favoriteCars?.some(
                      (favCar) => favCar.carId === data.carId
                    ) ? (
                      <RatedIcon />
                    ) : (
                      <UnratedIcon />
                    )}
                  </div>
                </div>
              </div>
            ) : null}
            {/* <Typography>{data.year}</Typography> */}
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2  text-base md:text-lg lg:text-xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isHovered ? data.year+" "+data.brand + " " + data.model : truncatedText}
                {/* {`${data.brand} ${data.model}`.length > 25 ? `${data.brand} ${data.model}`.substring(0, 22) + '...' : `${data.brand} ${data.model}`} */}
              </Typography>

           


              <p className=" sm:text-[0.400rem] md:text-[0.580rem] lg:text-[0.666rem] font-medium uppercase flex space-x-0 flex-wrap">
              <span className="flex items-center p-[1px] rounded-sm text-black font-[sourceSans] ">
    <DriveEtaIcon className=" text-[0.9rem] sm:text-[0.5rem] md:text-[0.7rem] lg:text-[0.8rem] transform scale-[0.6] sm:scale-[0.9] md:scale-[0.7] lg:scale-[0.9]"  style={{ color: "#6EC207"  }}/> {/* KM Driven Icon */}
    {data.kmDriven} KM
  </span>
  <span className="flex items-center p-[1px] rounded-sm text-black font-[sourceSans]">
    <LocalGasStationIcon className=" text-[0.9rem] sm:text-[0.5rem] md:text-[0.7rem] lg:text-[0.8rem] transform scale-[0.6] sm:scale-[0.9] md:scale-[0.7] lg:scale-[0.9]h-2 w-2 sm:h-1 sm:w-1 md:h-2 md:w-2 lg:h-3 lg:w-3" style={{ color: "#6EC207" }} /> {/* Fuel Type Icon */}
    {data.fuelType}
  </span>
  <span className="flex items-center p-[1px] rounded-sm text-black font-[sourceSans]">
    <TransmissionIcon className="text-[0.9rem] sm:text-[0.5rem] md:text-[0.7rem] lg:text-[0.8rem] transform scale-[0.6] sm:scale-[0.9] md:scale-[0.7] lg:scale-[0.9]" style={{ color: "#6EC207"  }} /> {/* Transmission Icon */}
    {data.transmission}
  </span>
</p>
            <Typography variant="h6" className="font-bold text-blue-gray-900  text-lg md:text-xl ">
              ₹ {data.price}
            </Typography>
            {/* <Link to={`/carlist/cardetails/${data.carId}`}>
            <button className="mt-2 mb-4 p-[7px] bg-indigo-500 rounded-lg      text-white">
              View Car
            </button>
          </Link> */}
           <Link to={`/carlist/cardetails/${data.carId}`}>
          {" "}
          <Typography  variant="h6"  className="mb-2 mt-2  text-sm md:text-base"  style={{ display: 'flex', alignItems: 'center', color: "green" }}>
            View Car Details  <FaArrowRight style={{ color: 'green', fontSize: '15px' }} />
          </Typography>
          </Link>
            <hr />

              <div className="flex align-bottom items-baseline gap-3    text-sm md:text-base text-gray-700 ">
              {/* <Typography variant="h10" color="blue-gray" className="mb-2">
              <CheckCircle style={{ color: 'green' }}/>  {data.title}
            </Typography> */}
            <FaLocationDot  style={{ color: '#000' }} />
            <div className="  text-base text-gray-700 font-[sourceSans]">
             {data.area},{data.city}
            </div>
          </div>
            {/* <p className="text-sm text-purple-500 font-[sourceSans]">Free Test Drive Today at {data.area}</p> */}
         
        </CardBody>
      </Card>
      )}
    </div>
  );
}
