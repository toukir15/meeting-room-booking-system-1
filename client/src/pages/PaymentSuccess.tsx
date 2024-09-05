import React from "react";
import { Link, useNavigate } from "react-router-dom";
import success from "../../public/successful.png";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  // Handler to navigate to the bookings page
  const handleGoToBookings = (): void => {
    navigate("/bookings"); // Adjust this path based on your routing structure
  };

  // Handler to navigate to the home page
  const handleGoHome = (): void => {
    navigate("/"); // Adjust this path if your home page is different
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white px-10 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-semibold text-green-500 mb-12">
          Payment Successful!
        </h1>
        <div className="flex justify-center items-center">
          <img className="w-52" src={success} alt="" />
        </div>
        <p className="text-gray-700 mb-10 mt-8">
          Thank you for your booking. You will receive a confirmation email
          shortly.
        </p>
        <div className="space-x-4">
          <Link
            to={"/book-room/my-bookings"}
            onClick={handleGoToBookings}
            className="bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded  transition-colors"
          >
            View Bookings
          </Link>
          <button
            onClick={handleGoHome}
            className="bg-gray-200 text-gray-700 py-2 px-4 roundeds hover:bg-gray-300 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
