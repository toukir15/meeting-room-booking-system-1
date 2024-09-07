import customer1 from "/images/testmonial/customer1.jpg";
import customer2 from "/images/testmonial/customer2.jpg";
import customer3 from "/images/testmonial/customer3.jpg";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./Testmonial.css";

export default function Testmonial() {
  return (
    <section className="bg-[#F7F9FB] py-40 ">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-20 text-center">
          Customer Testimonials
        </h1>

        <div>
          <div>
            <div className="flex justify-between gap-10 space-x-6 mt-10">
              <div className="w-[400px]">
                <img
                  src={customer2}
                  alt="Person working"
                  className="w-[400px] h-[400px] object-cover image1"
                />
                <h3 className="text-2xl font-medium mb-3">Toukir Ahmed</h3>
                <p className="text-gray-700">
                  Access your company’s Teem desktop app to view room and desk
                  bookings, check workplace analytics, update wayfinding, or
                  welcome visitors.
                </p>
                <button className="mt-3 font-medium flex gap-1 text-rose-500 items-center hover:text-rose-600 transition duration-200">
                  <span>Read More</span>
                  <span className="text-[20px] relative top-[2px]">
                    <MdKeyboardArrowRight />
                  </span>
                </button>
              </div>
              <div className="w-[400px]">
                <img
                  src={customer1}
                  alt="Team working"
                  className="w-[400px] h-[400px] object-cover image2"
                />
                <h3 className="text-2xl font-medium mb-3">Tanvir Ahmed</h3>
                <p className="text-gray-700">
                  Access your company’s Teem desktop app to view room and desk
                  bookings, check workplace analytics, update wayfinding, or
                  welcome visitors.
                </p>
                <button className="mt-3 font-medium flex gap-1 text-rose-500 items-center hover:text-rose-600 transition duration-200">
                  <span>Read More</span>
                  <span className="text-[20px] relative top-[2px]">
                    <MdKeyboardArrowRight />
                  </span>
                </button>
              </div>
              <div className="w-[400px]">
                <img
                  src={customer3}
                  alt="Discussion"
                  className="w-[400px] h-[400px] object-cover image3"
                />
                <h3 className="text-2xl font-medium mb-3">Ismail Masud</h3>
                <p className="text-gray-700">
                  Access your company’s Teem desktop app to view room and desk
                  bookings, check workplace analytics, update wayfinding, or
                  welcome visitors.
                </p>
                <button className="mt-3 font-medium flex gap-1 text-rose-500 items-center hover:text-rose-600 transition duration-200">
                  <span>Read More</span>
                  <span className="text-[20px] relative top-[2px]">
                    <MdKeyboardArrowRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
