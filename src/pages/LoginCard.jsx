// /* eslint-disable no-unused-vars */
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Input,
//   Button,
// } from "@material-tailwind/react";
// import { useState } from "react";
// import { useSignInMutation } from "../services/authAPI";
// import { setToken } from "../features/authSlice";
// import { toast, ToastContainer } from 'react-toastify';
// import { useDispatch } from "react-redux";
// import { jwtDecode } from "jwt-decode";
// import { Visibility, VisibilityOff } from '@material-ui/icons';
// import cartechlogo2 from "/cars/cartechlogo3.png";
// export function LoginCard() {
//   const [formStateData, setFormStateData] = useState({
//     username: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const [signIn] = useSignInMutation();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormStateData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleTogglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data , error} = await signIn(formStateData);
            
//       if (data) {
         
//         const jwtDecodes = jwtDecode(data);
//         const jwtDecodesJson = JSON.stringify(jwtDecodes);
//         localStorage.setItem("userInfo", jwtDecodesJson);
        
//         toast.success("Login Sucessfully");
//         setTimeout(() => {
//           navigate("/");
//         }, 1000); 
//         dispatch(setToken(data));
//       } else {
//         if(error.status === 401){
//           toast.error(error.data.message);
//         }else{

//           toast.error("email and password is not match");
//         }
//       }

//       // Handle successful sign-in, such as redirecting to a different page
//     } catch (error) {
//       // console.log(error);
//       // Handle sign-in error
//     }

    
//   };

//   return (
//     <>
    
//    <div className=" ">
     
//      <div className="md:mt-2 mt-5 md:ml-8 ml-5">
//       <Link to={"/"}>
//       <div className=" flex text-blue-gray-900 cursor-pointer font-bold text-2xl gap-2  ">
//       <img
//             src={cartechlogo2}
//             alt="logo"
//             className="  w-12 lg:w-[70px] lg:h-[64px] "
//           />
//            <span className="mt-3">caryanamindia</span> 
//     </div>
       
// </Link>
// </div>


//     <div className="flex justify-center items-center mx-2 mt-10" 
    
    
//     // style={{
//     //     backgroundImage: "url('../public/new/bgn6.jpg')",
//     //     backgroundSize: "cover",
//     //     backgroundPosition: "center",
//     //     margin: "0px 0px 0px 0px",
//     //     height: "90vh"
//     //   }}
//       >
   
   
//     <ToastContainer autoClose={2000} />
    
//       <Card className="w-96 bg-white shadow-white border border-blue-400 shadow-md ">
      
//       <div className=" mb-12 ">
// <Link to={"/"}>
//           {/* <Typography className="flex cursor-pointer mt-2  font-bold text-3xl justify-center items-center 
//            ">
//             caryanamindia
//           </Typography> */}


//         </Link>
//         </div>


      
//         <CardHeader
//           variant="gradient"
//           // color="gray"
//           className="grid h-28 place-items-center bg-[#8a90d4]"
//         >
//           <Typography variant="h3" color="white">
//             Sign In
//           </Typography>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardBody className="flex flex-col gap-1">
//           <Typography variant="h6" color="blue-gray" className="">
//                   Email
//                 </Typography>
//             <Input
//               placeholder="Enter your email-id"
//               name="username"
//               type="email"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//               value={formStateData.username}
//               onChange={handleChange}
//             />
//              <Typography variant="h6" color="blue-gray" className="">
//                   Password
//                 </Typography>
//             <Input placeholder="enter your password"
//               name="password"
//               type={showPassword ? 'text' : 'password'}
//               value={formStateData.password}
//               onChange={handleChange}
//               labelProps={{
//                 className: "hidden",
//               }}
//               icon={showPassword ? <VisibilityOff onClick={handleTogglePassword} className="cursor-pointer" /> : <Visibility onClick={handleTogglePassword} className="cursor-pointer" />} />
//           </CardBody>
//           <CardFooter className="pt-0">
//             <Button  className="bg-[#8a90d4]" fullWidth type="submit">
//               Sign In
//             </Button>
//             <div className="flex items-center justify-center mt-4">
//             <Typography variant="small" className="flex justify-center">
//   Don&apos;t have an account?{' '}
// </Typography>

//               <Link to="/signup">
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="ml-1 font-bold "
//                 >
//                   Sign up
//                 </Typography>
//               </Link>
//             </div>
//             <div className="flex justify-center">
//                 <Link to="/forgetPassword">
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="ml-1 font-bold"
//                 >
//                   Forget Password ?
//                 </Typography>
//               </Link>
//               </div>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//     </div>
//     </>
//   );
// }








// LoginCard.jsx
import { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, CardActions, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from "../services/authAPI";
import { setToken } from "../features/authSlice";
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import backgroundImage from '../../public/cars/Bg3.jpg'; 
import FacebookIcon from '@mui/icons-material/Facebook'; 
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter'; 
import { StickyNavbar } from '../components/navbars/StickyNavbar';

const LoginCard = () => {
  const [formStateData, setFormStateData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormStateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await signIn(formStateData);
      if (data) {
        const jwtDecodes = jwtDecode(data);
        const jwtDecodesJson = JSON.stringify(jwtDecodes);
        localStorage.setItem("userInfo", jwtDecodesJson);
        
        toast.success("Login Sucessfully");
        setTimeout(() => {
          navigate("/");
        }, 1000); 
        dispatch(setToken(data));
      } else {
        if (error?.status === 401) {
          toast.error(error.data.message);
        } else {
          toast.error("Email and password do not match");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <StickyNavbar />
      <Box
        sx={{
          backgroundImage: {
            xs: "none", // mobile
            sm: "none", // tablet
            md: `url(${backgroundImage})`, // desktop
          },
          backgroundColor: {
            xs: "black", 
            sm: "black",
            md: "transparent",
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Overlay for desktop (darken image only on md+) */}
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        />
        
        <ToastContainer autoClose={2000} />

        <Box
          sx={{
            zIndex: 2,
            paddingTop: "50px",
            margin: "20px",
          }}
        >
          <Card
            style={{
              width: "350px",
              margin: "40px auto 0",
              textAlign: "center",
              backgroundColor: "transparent",
              borderRadius: "20px",
              padding: "20px",
              border: "2px solid rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <CardContent>
              <Typography variant="h4" gutterBottom color="white">
                Sign In
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Email"
                  name="username"
                  type="email"
                  value={formStateData.username}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  InputProps={{
                    style: { color: "white", height:"65px" },
                  }}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.8)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.8)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.8)",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                    "& input:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
                      WebkitTextFillColor: "white !important",
                      caretColor: "white !important",
                      transition: "background-color 9999s ease-in-out 0s",
                    },
                  }}
                />
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formStateData.password}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  InputProps={{
                    endAdornment: (
                      <Button onClick={handleTogglePassword}>
                        {showPassword ? (
                          <VisibilityOff style={{ color: "white" }} />
                        ) : (
                          <Visibility style={{ color: "white" }} />
                        )}
                      </Button>
                    ),
                    style: { color: "white", height: "65px" },
                  }}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.8)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.8)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "transparent",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.8)",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                      padding: "16px 20px",
                    },
                    "& input:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
                      WebkitTextFillColor: "white !important",
                      caretColor: "white",
                      transition: "background-color 9999s ease-in-out 0s",
                    },
                  }}
                />

                <CardActions>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Sign In
                  </Button>
                </CardActions>
              </form>
            </CardContent>

            <CardActions style={{ justifyContent: "center", marginBottom: "10px" }}>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Typography variant="body2" style={{ color: "white" }}>
                  Don’t have an account? Sign Up
                </Typography>
              </Link>
            </CardActions>

            <CardActions style={{ justifyContent: "center", marginBottom: "10px" }}>
              <Link to="/forgetPassword" style={{ textDecoration: "none" }}>
                <Typography variant="body2" style={{ color: "white" }}>
                  Forget Password ?
                </Typography>
              </Link>
            </CardActions>

            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
              <IconButton aria-label="Facebook" style={{ color: "peachpuff" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Google" style={{ color: "peachpuff" }}>
                <GoogleIcon />
              </IconButton>
              <IconButton aria-label="Twitter" style={{ color: "peachpuff" }}>
                <TwitterIcon />
              </IconButton>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default LoginCard;
