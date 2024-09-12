import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Footer from "../Footer";

export default function MainLayout() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Function to handle scrolling to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle scroll event to show or hide the button
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Outlet />
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <div className="fixed bottom-5 right-5">
          <button
            className="bg-rose-500 text-white p-4 rounded-full shadow-lg hover:bg-rose-600 z-[200]"
            onClick={scrollToTop}
          >
            <MdOutlineArrowForwardIos className="-rotate-90" />
          </button>
        </div>
      )}
    </div>
  );
}
