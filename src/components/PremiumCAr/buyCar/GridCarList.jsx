// /* eslint-disable react/prop-types */
// import { CardDefault } from "../../ui/CardDefault";
// // import CardUi from "../../ui/CardUi";
// import { useEffect, useState } from "react";

// const GridCarList = ({ data, error,refetch ,isLoading , loadMoreRef }) => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     if (data?.list && Array.isArray(data.list)) {
//       console.log(data.list)
//       setPosts(data.list);
//     } else if (error) {
//       // console.error("Data not Found");
//     }
//   }, [data, error]);

//   return (
//     <>
//       <div className="grid grid-cols-1 gap-y-6 md:grid-cols-1 md:gap-y-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-4 mb-5">
//         {posts?.map((items, index) => {
//           return (
//             <div key={index}>
//               <div className="flex">
//                 <CardDefault data={items} Carid={items.carId} refetch={refetch} />
//               </div>
//             </div>
//           );
//         })}
//         <div ref={loadMoreRef} style={{ height: '100px', background: 'transparent' }}>
//         {/* This is the sentinel for triggering infinite scroll */}
//         {isLoading && <p>Loading more cars...</p>}
//       </div>
//       </div>
//     </>
//   );
// };

// export default GridCarList;


// import { CardDefault } from "../../ui/CardDefault";
// import { useEffect, useState } from "react";

// const GridCarList = ({ data, error, refetch, isLoading, onLoadMore }) => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     if (data?.list && Array.isArray(data.list)) {
//       setPosts((prevPosts) => [...prevPosts, ...data.list]);
//     }
//   }, [data]);

//   const renderContent = () => {
//     if (error) {
//       return (
//         <p className="text-center text-red-500 font-bold">
//           Something went wrong. Please try again later.
//         </p>
//       );
//     }

//     if (!posts.length && !isLoading) {
//       return (
//         <p className="text-center text-gray-500 font-bold">
//           No cars available to display.
//         </p>
//       );
//     }

//     return (
//       <>
//         <div className="grid grid-cols-1 gap-y-6 md:grid-cols-1 md:gap-y-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-4 mb-5">
//           {posts.map((items) => (
//             <div key={items.carId}>
//               <div className="flex">
//                 <CardDefault data={items} Carid={items.carId} refetch={refetch} />
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-center mt-4">
//           <button
//             onClick={onLoadMore}
//             className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//             disabled={isLoading}
//           >
//             {isLoading ? "Loading..." : "Load More"}
//           </button>
//         </div>
//       </>
//     );
//   };

//   return <>{renderContent()}</>;
// };

// export default GridCarList;


// import { CardDefault } from "../../ui/CardDefault";
// import { useEffect, useState } from "react";
// import PropTypes from "prop-types"; // Import PropTypes

// const GridCarList = ({ data, error, refetch, isLoading, onLoadMore }) => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     if (data?.list && Array.isArray(data.list)) {
//       setPosts((prevPosts) => [...prevPosts, ...data.list]);
//     }
//   }, [data]);

//   console.log("Posts in GridCarList component:", posts);

//   const renderContent = () => {
//     if (error) {
//       return (
//         <p className="text-center text-red-500 font-bold">
//           Something went wrong. Please try again later.
//         </p>
//       );
//     }

//     if (!posts.length && !isLoading) {
//       return (
//         <p className="text-center text-gray-500 font-bold">
//           No cars available to display.
//         </p>
//       );
//     }

//     return (
//       <>
//         <div className="grid grid-cols-1 gap-y-6 md:grid-cols-1 md:gap-y-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-4 mb-5">
//           {posts.map((items) => (
//             <div key={items.carId}>
//               <div className="flex">
//                 <CardDefault data={items} Carid={items.carId} refetch={refetch} />
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-center mt-4">
//           <button
//             onClick={onLoadMore}
//             className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//             disabled={isLoading}
//           >
//             {isLoading ? "Loading..." : "Load More"}
//           </button>
//         </div>
//       </>
//     );
//   };

//   return <>{renderContent()}</>;
// };


// // Add PropTypes validation
// GridCarList.propTypes = {
//   data: PropTypes.shape({
//     list: PropTypes.array.isRequired,
//   }).isRequired,
//   error: PropTypes.object,
//   refetch: PropTypes.func.isRequired,
//   isLoading: PropTypes.bool.isRequired,
//   onLoadMore: PropTypes.func.isRequired,
// };

// export default GridCarList;




import { CardDefault } from "../../ui/CardDefault";
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { FiLoader } from "react-icons/fi"; // Spinner icon

const GridCarList = ({ data, error, refetch, isLoading,isFetching, pageNO }) => {
  const [posts, setPosts] = useState([]);



  useEffect(() => {
    if (data?.list && Array.isArray(data.list)) {
            console.log("Appending cars in GridCarList component:", data.list);
console.log("pageNo............."+pageNO)
      setPosts((prevPosts) => {

        if (pageNO === 1) {
          return data.list; // Replace with fresh data
        }
  
        // Merge only unique car data (avoid duplicates)
        const newPosts = data.list.filter(
          (car) => !prevPosts.some((prevCar) => prevCar.carId === car.carId)
        );
        return [...prevPosts, ...newPosts];
      });
    }
  }, [data,pageNO]);

  // useEffect(() => {
  //   if (data?.list && Array.isArray(data.list)) {
  //     // Append new data with a slight delay
  //     setTimeout(() => {
  //       setPosts((prevPosts) => {
  //         const newPosts = data.list.filter(
  //           (car) => !prevPosts.some((prevCar) => prevCar.carId === car.carId)
  //         );
  //         return [...prevPosts, ...newPosts];
  //       });
  //     }, 500); // Delay to simulate smooth transition
  //   }
  // }, [data]);
  

  const renderContent = () => {
    if (error) {
      return (
        <p className="text-center text-red-500 font-bold">
          Something went wrong. Please try again later.
        </p>
      );
    }

    if (!posts.length && !isLoading) {
      return (
        <p className="text-center text-gray-500 font-bold">
          No cars available to display.
        </p>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-1 md:gap-y-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-4 mb-5">
          {posts.map((items) => (
            <div key={items.carId}>
              <div className="flex">
                <CardDefault data={items} Carid={items.carId} refetch={refetch} isLoading={isLoading}/>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {/* Spinner when loading */}
          {isFetching ? (
            <FiLoader className="animate-spin text-blue-500 h-8 w-8" />
          ) : (
            null
          )}
        </div>
      </>
    );
  };

  return <>{renderContent()}</>;
};

// PropTypes validation
GridCarList.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.array.isRequired,
  }).isRequired,
  error: PropTypes.object,
  refetch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  pageNO: PropTypes.func.isRequired,

};

export default GridCarList;
