import useAuth from "../hooks/useAuth";
import Gallery from "./Gallery";
import Offers from "./Offers";
import Products from "./Products";
import Reviews from "./Reviews";

import TopBanner from "./TopBanner";

const Home =()=>{
    const { user } = useAuth();
    return (
       <div>
           <TopBanner></TopBanner>
           <Products></Products>
           <Reviews></Reviews>
           <Offers></Offers>
       </div>
   )
}
export default Home;