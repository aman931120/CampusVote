import React from "react";
import { useNavigate } from "react-router-dom"; // <-- import this

const NomineeLogin = () => {
  const navigate = useNavigate(); // <-- initialize the hook

  return (
    <div className="min-h-screen bg-gray-700 pt-20">
      {/* Instruction Button */}
      <div className="flex justify-center mt-10">
        <button
          className="bg-red-300 text-black font-semibold px-6 py-2 rounded-full shadow-md hover:bg-red-400"
          onClick={() => navigate("/NomineeLogin/instructions")} // <-- navigate on click
        >
          INSTRUCTION
        </button>
      </div>

      {/* Login Card Section */}
      <div className="flex justify-center mt-12">
        <div className="bg-gray-300 rounded-lg p-10 shadow-md w-full max-w-xl">
          <h2 className="text-center text-xl font-semibold mb-6">
            Nominate Yourself
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 text-center">Login</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Email ID
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NomineeLogin;
