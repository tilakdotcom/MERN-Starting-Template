import React from "react";
// import { errorToast, successToast } from "@/lib/toast";

const Header: React.FC = () => {
  const auth = true;
  async function logout() {
    console.log("logged out from");
  }
  return (
    <header className="bg-green-600 text-white py-4 px-6 md:px-12 flex items-center justify-between h-20 w-full">
      <h1 className="text-2xl font-bold">My App</h1>
      {!auth && (
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
