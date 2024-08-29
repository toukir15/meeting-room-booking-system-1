import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="h-[100vh] text-white flex flex-col justify-center items-center px-1">
      <div className="text-center">
        <h1 className="mb-3 text-[150px] font-bold leading-none text-rose-500 flex gap-2">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </h1>
        <p className="mb-10 text-2xl text-gray-600">
          Oops! Looks like you're lost.
        </p>
        <div className="animate-bounce">
          <Link to="/">
            <svg
              className="mx-auto h-16 w-16 text-rose-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </Link>
        </div>
        <p className="mt-3 text-gray-600 text-lg">
          Let's get you back{" "}
          <Link to="/" className="text-primary">
            home
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
