import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="footer text-white bg-[#0B1221] relative">
      <div className="container lg:mx-auto px-4 lg:px-12 py-6 lg:py-20">
        <div className="lg:flex justify-between">
          {/* footer first column */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div>
                {/* <img
                  src={keyboard}
                  className="w-8 h-8 relative bottom-1"
                  alt=""
                /> */}
              </div>
              <h3 className="lg:text-[28px] text-[24px] ">KeyGenius</h3>
            </div>
            <p className="mt-2 lg:mt-8">
              From 2019, we've empowered 100+ fast-growing <br /> companies
              across 10+ industries with impactful solutions.
            </p>
            <div className="mt-3 lg:mt-8 flex gap-4">
              <Link to={"https://www.facebook.com/toukir.ahmed.215/"}>
                <button className="bg-white text-blue-500 p-3 text-xl rounded-full shadow-lg hover:bg-[#f0f4f8]">
                  <FaFacebookF />
                </button>
              </Link>
              <Link to={"https://github.com/toukir15"}>
                <button className="bg-white text-black p-3 text-xl rounded-full shadow-lg hover:bg-[#f0f4f8]">
                  <FaGithub />
                </button>
              </Link>
              <Link to={"https://www.linkedin.com/in/toukir15/"}>
                <button className="bg-white text-blue-600 p-3 text-xl rounded-full shadow-lg hover:bg-[#f0f4f8]">
                  <FaLinkedinIn />
                </button>
              </Link>
              <Link to={"https://x.com/toukir_ahm9211"}>
                <button className="bg-white text-black p-3 text-xl rounded-full shadow-lg hover:bg-[#f0f4f8]">
                  <FaXTwitter />
                </button>
              </Link>
            </div>
          </div>
          {/* footer second column */}
          <div className="flex flex-col mt-6 lg:mt-0 lg:gap-4 text-md lg:text-lg">
            <Link to={"/"} className="hover:text-[#f0f4f8]">
              Home
            </Link>
            <Link to={"/"} className="hover:text-[#f0f4f8]">
              Products
            </Link>
            <Link to={"/"} className="hover:text-[#f0f4f8]">
              About Us
            </Link>
            <Link to={"/"} className="hover:text-[#f0f4f8]">
              Contact Us
            </Link>
          </div>
          {/* footer third column */}
          <div className="flex flex-col mt-6 lg:mt-0 lg:gap-4 text-md lg:text-lg">
            <button className="text-start hover:text-[#f0f4f8]">
              Online Delivery
            </button>
            <button className="text-start hover:text-[#f0f4f8]">
              Refund and Return Policy
            </button>
            <button className="text-start hover:text-[#f0f4f8]">
              Online Delivery
            </button>
            <button className="text-start hover:text-[#f0f4f8]">
              Terms and Conditions
            </button>
          </div>
          {/* footer fourth column */}
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
      <div className="absolute bottom-44 -left-64 hidden h-[150px] w-[900px] -rotate-45 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-800 opacity-30 blur-3xl filter dark:block lg:bottom-24 lg:-left-20 lg:h-28 lg:w-[250px] lg:-rotate-12 lg:opacity-20 xl:h-40 xl:w-[400px]"></div>
      <div className="absolute right-[28%] top-0 hidden h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-blue-600 to-sky-400 opacity-20 blur-3xl filter dark:block dark:opacity-30 lg:top-44 lg:right-20 lg:h-48 lg:w-[350px] xl:h-32 xl:w-[400px]"></div>
    </div>
  );
}
