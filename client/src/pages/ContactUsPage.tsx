import { TbLocationFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import SecondaryNavbar from "../components/shared/SecondaryNavbar";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[100]">
        <SecondaryNavbar />
      </div>

      <div className="min-h-screen flex py-24 md:py-40 lg:py-0  ">
        <div className="lg:flex gap-28 items-center  container mx-auto px-5 md:px-20 lg:px-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-2/3"
          >
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 md:mb-8 mt-5">
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

              <div className="mb-5 sm:mb-7 md:mb-10 mt-5">
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

              <div className="mb-5 sm:mb-7 md:mb-10 mt-5">
                <label className="text-gray-600" htmlFor="subject">
                  Subject <span>*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray appearance-none focus:outline-none"
                  placeholder="Your subject here..."
                  required
                  autoComplete="off"
                  autoFocus={true}
                />
              </div>

              <div>
                <label className="text-gray-600" htmlFor="message">
                  Message <span>*</span>
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray appearance-none focus:outline-none"
                  placeholder="Your message here..."
                  required
                  autoComplete="off"
                  autoFocus={true}
                />
              </div>

              <div className="flex items-center gap-3 mt-8 group">
                <button
                  type="submit"
                  className="py-3 px-7 rounded-full bg-rose-500 hover:bg-rose-600 transition duration-200 text-white text-body font-medium"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full sm:w-2/3 lg:w-1/3 mt-8 lg:mt-0 space-y-4"
          >
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
              <Link className="mb-0.5" to="">
                support@developerlook.com
              </Link>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <TbLocationFilled size={18} />
              <p>1603 Capitol Avenue, Suite 413</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
