import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Player from "lottie-react";
import successAnimation from "../../public/lottie/success.json"; // Adjust path to your lottie file

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  // Handler to navigate to the bookings page
  const handleGoToBookings = (): void => {
    navigate("/bookings");
  };

  // Handler to navigate to the home page
  const handleGoHome = (): void => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-[#f8f9fa] px-10 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-semibold  mb-12">Payment Successful!</h1>
        <div className="flex justify-center items-center">
          {/* Replace img with Lottie Player */}
          <Player
            autoplay
            loop
            animationData={successAnimation}
            style={{ width: "300px", height: "300px" }}
          />
        </div>
        <p className="text-gray-700 mb-10 mt-8">
          Thank you for your booking. You will receive a confirmation email
          shortly.
        </p>
        <div className="space-x-4">
          <Link
            to={"/book-room/my-bookings"}
            onClick={handleGoToBookings}
            className="bg-primary hover:bg-primary-hover text-white py-3 px-4 rounded  transition-colors"
          >
            View Bookings
          </Link>
          <button
            onClick={handleGoHome}
            className="bg-gray-200 text-gray-700 py-3 px-4 rounded hover:bg-gray-300 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
