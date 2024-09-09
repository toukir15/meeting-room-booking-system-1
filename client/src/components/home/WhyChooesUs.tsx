import { FaArrowUp } from "react-icons/fa6";
import calendar from "/images/whyChooes/calendar.svg";
import building from "/images/whyChooes/building.svg";
import team from "/images/whyChooes/team.svg";
import sprout from "/images/whyChooes/sprout.svg";
import analytics from "/images/whyChooes/analytics.svg";
import startup from "/images/whyChooes/startup.svg";
import { motion } from "framer-motion";

const data = [
  {
    id: 1,
    image: building,
    title: "Optimise office space",
    description:
      "Commit to a smaller office space (even as your team grows!) and save money.",
  },
  {
    id: 2,
    image: team,
    title: "Elevate experience",
    description:
      "Boost your workplace's UX with tools that enable flexibility, visibility, autonomy.",
  },
  {
    id: 3,
    image: calendar,
    title: "Power hybrid work",
    description:
      "Future-proof your hybrid work model with an easy-to-use planning calendar.",
  },
  {
    id: 4,
    image: sprout,
    title: "Create a sustainable workplace",
    description:
      " Embrace a sustainable workplace approach by managing your Scope 2 & Scope 3 emissions.",
  },
  {
    id: 5,
    image: analytics,
    title: "Get real data for smart decisions",
    description:
      "Arm yourself with workplace analytics and optimize office space usage.",
  },
  {
    id: 6,
    image: startup,
    title: "Maximize workplace flexibility",
    description:
      "Make hot desking and other flexible seating policies easy and productive.",
  },
];

export default function WhyChooesUs() {
  return (
    <section className="mb-10 md:mb-32 bg-[#F7F9FB] py-16 px-8 md:py-32">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-3xl md:text-4xl text-gray-800 font-bold">
              Why Choose Us?
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((d) => {
              return (
                <div className="bg-white p-6 rounded h-full text-start">
                  <div className="flex md:justify-center">
                    <img className="w-24 mb-4" src={d.image} alt="Startup" />
                  </div>
                  <h5 className="text-2xl font-medium mb-2">{d.title}</h5>
                  <p className=" mb-auto">{d.description}</p>
                  <div className="mt-6 flex justify-end">
                    <button className="group-hover:rotate-45 transition-all duration-200 rotate-90 bg-[#F7F9FB] p-6 rounded-full text-[20px]">
                      <FaArrowUp />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
