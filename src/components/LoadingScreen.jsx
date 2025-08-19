// // LoadingScreen.js

import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCarSide } from "@fortawesome/free-solid-svg-icons";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30); // 100 steps * 30ms = 3s total

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-[200vh] bg-black text-white z-[9999] flex flex-col items-center pt-[300px]">
      {/* Track with Car */}
      <div className="relative w-3/4 h-5 mb-6">
        {/* Progress Bar (Background Track) */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-300 rounded overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Car Icon */}
        <img
          src="/src/components/formula-one_18299390.png"
          // alt="car"
          className="absolute top-1/2 -translate-y-[70%] transition-all duration-300"
          style={{
            left: `calc(${progress}% - 16px)`,
            width: "80px",
            height: "100px",
          }}
        />
      </div>

      {/* Loading Text */}
      <p className="text-[20px]">Loading...</p>
      <p className="text-[15px]">{progress}%</p>
    </div>
  );
};

export default LoadingScreen;
