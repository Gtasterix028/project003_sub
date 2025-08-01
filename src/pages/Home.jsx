// import { AccordionCustom } from "../components/home/AccordionCustom";
import Footer from "../components/Footer";
// import BrandList from "../components/home/BrandList";
// import HeroSection from "../components/home/HeroSection";
import { StickyNavbar } from "../components/navbars/StickyNavbar";
// import FeaturedCars from "./FeaturedCars";
// import { useGetRecentCarQuery } from "../services/carAPI";
import HomeSection from "../components/home/HomeSection";
import AboutUs from "./AboutUs";
import FeaturedCars from "./FeaturedCars";
import StartSection from "../ui/StartSection";
import SearchByBody from "../components/home/SearchByBody";
import Testimonials from "../ui/Testimonials";

const Home = () => {
  // const { data, error } = useFilterCarQuery();
  // const { data, error } = useGetRecentCarQuery();



  return (
    <div>
      <StickyNavbar />

      <HomeSection />
      <FeaturedCars />
      
      {/* <div className="mt-[4rem] md:mt-[1rem] flex justify-center"> */}
        {/* <BrandList />
      </div>
      <div className="mt-2 md:my-5">
        <FeaturedCars data={data} error={error} />
      </div> */}
      {/* <AccordionCustom /> */}
      {/* <ContactUs/> */}


      <AboutUs />
      <StartSection />
      <SearchByBody />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
