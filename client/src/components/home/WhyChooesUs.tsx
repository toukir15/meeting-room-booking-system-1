import { FaArrowUp } from "react-icons/fa6";
import calendar from "/images/whyChooes/calendar.svg";
import building from "/images/whyChooes/building.svg";
import team from "/images/whyChooes/team.svg";
import desking from "/images/whyChooes/desking.svg";
import sprout from "/images/whyChooes/sprout.svg";
import analytics from "/images/whyChooes/analytics.svg";
import startup from "/images/whyChooes/startup.svg";

export default function WhyChooesUs() {
  return (
    <section className="mb-32 bg-[#F7F9FB] py-32">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 mt-20">
          <div className="w-[385px] bg-white p-8 flex justify-center items-center rounded">
            <h1 className="text-center text-4xl text-gray-800 font-bold">
              Why Chooes Us?
            </h1>
          </div>
          <div className="w-[385px] group transition duration-200 p-8 rounded">
            <img className="w-24" src={building} alt="" />
            <h5 className="text-2xl font-medium my-4">Optimise office space</h5>
            <p>
              Commit to a smaller office space (even as your team grows!) and
              save money.
            </p>
            <div className="flex justify-end">
              <button className=" group-hover:rotate-45 transition-all duration-200 relative bottom-0 rotate-90 bg-white p-6 rounded-full mt-6 text-[20px]">
                <FaArrowUp />
              </button>
            </div>
          </div>

          <div className="w-[385px] group transition duration-200 bg-white p-8 rounded">
            <img className="w-24" src={team} alt="" />
            <h5 className="text-2xl font-medium my-4">Elevate experience</h5>
            <p>
              Boost your workplace's UX with tools that enable flexibility,
              visibility, autonomy.
            </p>
            <div className="flex justify-end">
              <button className="group-hover:rotate-45 transition-all duration-200 relative bottom-0 rotate-90 bg-[#F7F9FB] p-6 rounded-full mt-6 text-[20px]">
                <FaArrowUp />
              </button>
            </div>
          </div>
          <div className="w-[385px] group transition duration-200  p-8 rounded">
            <img className="w-24" src={calendar} alt="" />

            <h5 className="text-2xl font-medium my-3">Power hybrid work</h5>
            <p>
              Future-proof your hybrid work model with an easy-to-use planning
              calendar.
            </p>
            <div className="flex justify-end">
              <button className="rotate-90 bg-white p-6 rounded-full mt-6 text-[20px]">
                <FaArrowUp />
              </button>
            </div>
          </div>
          <div className="w-[385px] group transition duration-200  p-8 rounded">
            <img className="w-24" src={sprout} alt="" />
            <h5 className="text-2xl font-medium my-3">
              Create a sustainable workplace
            </h5>
            <p>
              Embrace a sustainable workplace approach by your Scope 2 & Scope 3
              emissions.
            </p>
            <div className="flex justify-end">
              <button className="rotate-90 group-hover:rotate-45 transition-all duration-200 relative bottom-0 bg-white p-6 rounded-full mt-6 text-[20px]">
                <FaArrowUp />
              </button>
            </div>
          </div>
          <div className="w-[385px] group transition duration-200 bg-white p-8 rounded">
            <img className="w-24" src={analytics} alt="" />
            <h5 className="text-2xl font-medium my-3">
              Get real data for smart decisions
            </h5>
            <p>
              Arm yourself with workplace analytics and optimize office space
              usage.
            </p>
            <div className="flex justify-end">
              <button className="rotate-90 group-hover:rotate-45 transition-all duration-200 relative bottom-0 bg-[#F7F9FB] p-6 rounded-full mt-6 text-[20px]">
                <FaArrowUp />
              </button>
            </div>
          </div>
          <div className="w-[385px] group transition duration-200   p-8 rounded">
            <img className="w-24" src={startup} alt="" />
            <h5 className="text-2xl font-medium my-3">
              Maximize workplace flexibility
            </h5>
            <p>
              Make hot desking and other flexible seating policies easy and
              productive.
            </p>
            <div className="flex justify-end">
              <button className="rotate-90 group-hover:rotate-45 transition-all duration-200 relative bottom-0 bg-white p-6 rounded-full mt-6 text-[20px]">
                <FaArrowUp />
              </button>
            </div>
          </div>
          <div className="w-[385px] group transition duration-200 bg-white p-8 rounded">
            <img className="w-24" src={desking} alt="" />
            <h5 className="text-2xl font-medium my-3">
              Automate workspace booking
            </h5>
            <p>
              Forget Excel spreadsheets: reserve all office workspaces in a fast
              and efficient way.
            </p>
            <div className="flex justify-end">
              <button className="rotate-90 group-hover:rotate-45 transition-all duration-200 relative bottom-0 bg-[#F7F9FB] p-6 rounded-full mt-6 text-[20px]">
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
