import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
export default function Footer() {
  return (
    <div className="footer text-white bg-[#000000] ">
      <div className="container lg:mx-auto px-4 lg:px-12 py-6 lg:py-20">
        <div className="lg:flex justify-between">
          {/* footer first column  */}
          <div>
            {/* Logo  */}
            <div className="flex items-center gap-2">
              <div>
                {/* <img
                  src={keyboard}
                  className="w-8 h-8 relative bottom-1"
                  alt=""
                /> */}
              </div>
              <h3 className="lg:text-[28px] text-[24px] text-white ">
                KeyGenius
              </h3>
            </div>
            <p className="mt-2 lg:mt-8">
              From 2019, we've empowered 100+ fast-growing <br /> companies
              across 10+ industries with impactful solutions.
            </p>
            <div className="mt-3 lg:mt-8 flex gap-4">
              <Link to={"https://www.facebook.com/toukir.ahmed.215/"}>
                <button className="bg-white text-blue-500 p-3 text-xl rounded-full shadow-lg ">
                  <FaFacebookF />
                </button>
              </Link>
              <Link to={"https://github.com/toukir15"}>
                <button className="bg-white text-black p-3 text-xl rounded-full shadow-lg ">
                  <FaGithub />
                </button>
              </Link>
              <Link to={"https://www.linkedin.com/in/toukir15/"}>
                <button className="bg-white text-blue-600 p-3 text-xl rounded-full shadow-lg ">
                  <FaLinkedinIn />
                </button>
              </Link>
              <Link to={"https://x.com/toukir_ahm9211"}>
                <button className="bg-white text-black p-3 text-xl rounded-full shadow-lg ">
                  <FaXTwitter />
                </button>
              </Link>
            </div>
          </div>
          {/* footer second column  */}
          <div className="flex flex-col mt-6 lg:mt-0 lg:gap-4 text-md lg:text-lg">
            <Link to={"/"}>Home</Link>
            <Link to={"/"}>Products</Link>
            <Link to={"/"}>About Us</Link>
            <Link to={"/"}>Contact Us</Link>
          </div>
          {/* footer third column  */}
          <div className="flex flex-col mt-6 lg:mt-0 lg:gap-4 text-md lg:text-lg">
            <button className="text-start">Online Delivery</button>
            <button className="text-start">Refund and Return Policy</button>
            <button className="text-start">Online Delivery</button>
            <button className="text-start">Tearms and Conditions</button>
          </div>
          {/* footer fourth column  */}
          <div>
            <p className="font-medium text-start">KeyGenius</p>
            <p className="mt-4">
              Head Office: 28 Kazi Nazrul Islam Ave, <br /> Navana Zohura
              Square, Dhaka 1000
            </p>
            <p className="font-medium text-start mt-4">Email:</p>
            <p className="lg:mt-4">keygenius@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
