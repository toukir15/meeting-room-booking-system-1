import { TbLocationFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import SecondaryNavbar from "../components/shared/SecondaryNavbar";

const ContactUs = () => {
  return (
    <>
      <SecondaryNavbar />
      <div className="h-[calc(100vh-230px)]">
        <div className="md:flex gap-28 items-center mb-[50px] sm:mb-[60px] md:mb-[140px] lg:mt-[150px] md:mt-[150px] mt-[110px] container mx-auto px-40">
          <div className="w-2/3">
            <p className="text-4xl font-semibold  mb-8 mt-5">
              Send Us A Message
            </p>
            <form
              //   onSubmit={handleSubmit}
              autoComplete="off"
              className=""
            >
              <div className="mb-5 sm:mb-7 md:mb-10">
                <label className="text-gray-600" htmlFor="name">
                  I am <span>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray appearance-none focus:outline-none"
                  placeholder="Your name here.."
                  required
                  autoComplete="off"
                  autoFocus={true}
                />
              </div>

              <div className="flex gap-12 justify-between mb-5 sm:mb-7 md:mb-10 mt-5">
                <div className="w-full">
                  <label className="text-gray-600" htmlFor="email">
                    Email <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray appearance-none focus:outline-none"
                    placeholder="you@example.com"
                    required
                    autoComplete="off"
                    autoFocus={true}
                  />
                </div>
              </div>

              <div className="flex gap-12 justify-between mb-5 sm:mb-7 md:mb-10 mt-5">
                <div className="w-full">
                  <label className="text-gray-600" htmlFor="email">
                    Subject <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray appearance-none focus:outline-none"
                    placeholder="Your subject here..."
                    required
                    autoComplete="off"
                    autoFocus={true}
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-600" htmlFor="projectDetails">
                  Message <span>*</span>
                </label>
                <input
                  type="text"
                  name="projectDetails"
                  id="projectDetails"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray appearance-none focus:outline-none"
                  placeholder="Your message here..."
                  required
                  autoComplete="off"
                  autoFocus={true}
                />
              </div>

              <div className="flex items-center gap-3 mt-10 group">
                <button
                  type="submit"
                  className="py-3 px-7 rounded-full bg-rose-500 hover:bg-rose-600 transition duration-200 text-white text-body font-medium"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div className="sm:w-1/3  mt-8 md:mt-0 space-y-3 sm:space-y-4 md:space-y-5">
            <div className="flex items-center gap-3 text-gray-600">
              <CgOrganisation size={18} />
              <Link to="/">MeetEase</Link>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <FaPhoneAlt size={15} />
              <Link to="tel:+13073924362">+1 307 392 4362</Link>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MdAlternateEmail size={18} />
              <Link className="mb-0.5" to={""}>
                support@developerlook.com
              </Link>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <TbLocationFilled size={18} />
              <p>1603 Capitol Avenue, Suite 413</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
