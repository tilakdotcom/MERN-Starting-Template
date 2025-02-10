import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-green-500 to-teal-400 min-h-screen flex flex-col justify-center items-center">
      <div className="text-center px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-green-600">
          Welcome to AuthApp
        </h2>
        <p className="text-lg md:text-xl mb-6 text-gray-800">
          The simplest way to manage your authentication needs.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-green-600 py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
