import customer1 from "/images/testmonial/customer1.jpg";
import customer2 from "/images/testmonial/customer2.jpg";
import customer3 from "/images/testmonial/customer3.jpg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";
import "./Testmonial.css";

const testmonials = [
  {
    id: 1,
    name: "Toukir Ahmed",
    image: customer2,
    description:
      " Access your company’s Teem desktop app to view room and desk bookings, check workplace analytics, update wayfinding, or welcome visitors.",
  },
  {
    id: 2,
    name: "Tanvir Ahmed",
    image: customer1,
    description:
      " Access your company’s Teem desktop app to view room and desk bookings, check workplace analytics, update wayfinding, or welcome visitors.",
  },
  {
    id: 3,
    name: "Ismail Masud",
    image: customer3,
    description:
      " Access your company’s Teem desktop app to view room and desk bookings, check workplace analytics, update wayfinding, or welcome visitors.",
  },
];

export default function Testmonial() {
  return (
    <section className="bg-[#F7F9FB] py-12 md:py-20 lg:py-40">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 md:mb-20 text-center">
          Customer Testimonials
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row md:space-x-6 items-center gap-10"
        >
          {testmonials.map((testmonial) => {
            return (
              <div key={testmonial.id} className="w-full md:w-[400px] mx-auto">
                <img
                  src={testmonial.image}
                  alt="Person working"
                  className={`w-full h-[300px] md:h-[400px] object-cover image1 md:image${testmonial.id}`}
                />
                <h3 className="text-2xl font-medium mb-3  md:text-left">
                  {testmonial.name}
                </h3>
                <p className="text-gray-700  md:text-left">
                  {testmonial.description}
                </p>
                <button className="mt-3 font-medium flex justify-center md:justify-start gap-1 text-rose-500 items-center hover:text-rose-600 transition duration-200">
                  <span>Read More</span>
                  <span className="text-[20px] relative top-[2px]">
                    <MdKeyboardArrowRight />
                  </span>
                </button>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
